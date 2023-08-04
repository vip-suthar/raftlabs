import express, { Router } from "express";
import { deleteUser, getUser } from "../controllers/user.controller";

const userRouter: Router = express.Router();

userRouter
.route("/")
.get(getUser)
.delete(deleteUser);

export default userRouter;
