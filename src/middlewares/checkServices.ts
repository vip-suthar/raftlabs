import { Request, Response, NextFunction } from "express";
import connectDBService from "../services/db.service";
import connectMailService from "../services/mail.service";

export const checkServices = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        let success: boolean = true;

        success = success && await connectDBService();
        success = success && await connectMailService();

        if(success) next();

    } catch (err: any) {

    }
};
