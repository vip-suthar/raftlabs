import {
    Request,
    Response,
    ErrorRequestHandler,
    NextFunction,
} from 'express';

const errorRequestHandler: ErrorRequestHandler = (
    err: Error & { statusCode: number }, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });

    return;
}

export default errorRequestHandler;