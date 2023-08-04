import { body } from "express-validator";
import User from "../models/user.model";

export const createUserDataValidator = [
  body("username")
    .exists()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username should be string"),

  body("email")
    .exists()
    .withMessage("Email is required")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Provide valid email")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if(existingUser !== null) throw new Error("Email already in use");
    }),

  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password should be between 8 to 20 characters long")
    .custom((password) => {
      const validPass: RegExpMatchArray | null = password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&].+$/
      );
      return validPass !== null;
    })
    .withMessage("Password must contain atleast 1 lowercase, 1 uppercase, 1 digit, and 1 special character (any of: @ $ ! % * ? &)")
];

export const loginUserDataValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Provide valid email"),

  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string"),
];

export const forgotPassDataValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .trim()
    .isEmail()
    .withMessage("Provide valid email")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if(existingUser === null) throw new Error("No user exists with the provided email");
    })
];

export const resetPassDataValidator = [
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string"),

  body("token")
    .exists()
    .withMessage("Token is required")
    .isString()
    .withMessage("Token should be string")
];