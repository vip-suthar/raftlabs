import express, { Request, Response, Router } from "express";

import { verifyUserToken } from "../middlewares/verifyUserToken";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import blogRouter from "./blog.route";

const apiRouter: Router = express.Router();

apiRouter
.use("/auth", authRouter);

apiRouter
.use("/user", verifyUserToken, userRouter);

apiRouter
.use("/blog", verifyUserToken, blogRouter);

apiRouter.
route("/").
get((req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to API" });
});

export default apiRouter;
