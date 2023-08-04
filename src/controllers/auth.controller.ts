import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { jwtConfig } from "../config";
import User from "../models/user.model";
import { userSerializer } from "../serializers/user.serializer";
import sendMail from "../utils/sendMail";
import { confirmResetPasswordEmail, resetEmail } from "../utils/mailTemplates";

/* register/create new user */
export const register = async (req: Request, res: Response) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Error occured while parsing input data",
        error: errors.array()
      });
    }

    const { username, email, password } = req.body;

    const salt: string = await bcrypt.genSalt(10);
    const hash: string = crypto.createHash("sha256").update(password + salt).digest("hex");

    const user = new User({
      username,
      email,
      salt,
      hash
    });

    await user.save();

    const payload = {
      "_id": user._id,
      "username": user.username,
      "email": user.email,
      "expires_in": jwtConfig.DEFAULT_TOKEN_LIFE
    }

    const token: string = jwt.sign(
      payload,
      jwtConfig.SECRET,
      { expiresIn: jwtConfig.DEFAULT_TOKEN_LIFE }
    );

    res.status(200).json({
      message: "user created successfully",
      data: { token, user: userSerializer(user) },
    });

  } catch (err: any) {
    res.status(500).json({
      message: "Some error occured at the server"
    });
  }
};

/* user login */
export const login = async (req: Request, res: Response) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Error occured while parsing input data",
        error: errors.array()
      });
    }

    const { email, password } = req.body;

    const user: any = await User.findOne({ email });
    const salt: string = user.salt;
    const hash: string = crypto.createHash("sha256").update(password + salt).digest("hex");
    const isMatch: boolean = hash === user.hash;

    if (!isMatch) {
      return res.status(400).json({
        error: 'Incorrect Credentials'
      });
    }

    const payload = {
      "_id": user._id,
      "username": user.username,
      "email": user.email,
      "expires_in": jwtConfig.DEFAULT_TOKEN_LIFE
    }

    const token = jwt.sign(
      payload,
      jwtConfig.SECRET,
      { expiresIn: jwtConfig.DEFAULT_TOKEN_LIFE }
    );

    res.status(200).json({
      message: "user logged in successfully",
      data: { token, user: userSerializer(user) },
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Some error occured at the server"
    });
  }
};

/* forgot password */
export const forgotPassword = async (req: Request, res: Response) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Error occured while parsing input data",
        error: errors.array()
      });
    }

    const { email } = req.body;

    const user: any = User.findOne({ email });

    const resetToken: string = crypto.randomBytes(48).toString('hex');

    await user.updateOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: Date.now() + (4 * 60 * 60 * 1000) // 4 hours
    });

    sendMail({
      to: email,
      data: resetEmail(req.headers.host || "", resetToken)
    });

    res.status(200).json({
      message: "Email Sent Successfully",
      data: `An email is sent to <${email}> with instructions to reset password`
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      message: "Some error occured at the server"
    });
  }
};

/* Resetting password */
export const resetPassword = async (req: Request, res: Response) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Error occured while parsing input data",
        error: errors.array()
      });
    }

    const { password, token } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Reset password token error",
        error: "Your token has expired. Please attempt to reset your password again."
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash: string = crypto.createHash("sha256").update(password + salt).digest("hex");;

    await user.updateOne({
      hash: hash,
      resetPasswordToken: null,
      resetPasswordExpires: null
    });

    sendMail({
      to: user.email,
      data: confirmResetPasswordEmail()
    });

    res.status(200).json({
      message: "Password changed successfully",
      data: "Password changed successfully. Please login with your new password."
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Some error occured at the server"
    });
  }
};
