import express, { Router } from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword
} from "../controllers/auth.controller";
import {
  createUserDataValidator,
  forgotPassDataValidator,
  loginUserDataValidator,
  resetPassDataValidator,
} from "../validators/user.validator";

const authRouter: Router = express.Router();

authRouter
  .route("/register")
  .post(createUserDataValidator, register);

authRouter
  .route("/login")
  .post(loginUserDataValidator, login);

authRouter
  .route("/forgot")
  .post(forgotPassDataValidator, forgotPassword);

authRouter
  .route("/reset")
  .post(resetPassDataValidator, resetPassword);

export default authRouter;