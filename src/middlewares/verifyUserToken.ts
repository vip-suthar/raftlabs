import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtConfig } from "../config";

export const verifyUserToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send({ status: "error", message: "Unauthorized request" });
  }
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .send({ status: "error", message: "Access denied. No token provided." });
  }
  try {

    const decoded: any = jwt.verify(token, jwtConfig.SECRET);
    res.locals.user_id = decoded._id;
    next();

  } catch (err) {
    res.status(400).send({ status: "error", message: "Invalid token." });
  }
};
