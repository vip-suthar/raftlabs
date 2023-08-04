import { Request, Response } from "express";

import User from "../models/user.model";
import { userSerializer } from "../serializers/user.serializer";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(res.locals.user_id);
    res.json({ message: "success", data: userSerializer(user) });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(res.locals.user_id);
    res.json({ message: "success", data: userSerializer(user) });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
