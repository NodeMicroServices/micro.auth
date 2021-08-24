import { Request, Response, NextFunction } from "express";

import CustomError from "../errors/customError";

const errorHandler = (
    err: Error,
    _: Request,
    res: Response,
    __: NextFunction
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            errors: err.serializeErrors()
        })
    }

    return res.status(500).json({
        errors: [{
            message: 'Oops! Something went wrong.'
        }]
    });
}

export default errorHandler;
