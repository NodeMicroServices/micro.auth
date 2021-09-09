import { NextFunction, Request, Response } from "express";
import { validationResult, ValidationChain } from "express-validator";

import {RequestValidationError} from "../errors";

const validateRequest = (schemas: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction ) => {
        await Promise.all(schemas.map((schema) => schema.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        next();
    }
}

export default validateRequest;
