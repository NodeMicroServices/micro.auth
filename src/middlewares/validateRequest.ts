import {RequestHandler} from "express";
import {validationResult} from "express-validator";

import {RequestValidationError} from "../errors";

const validateRequest: RequestHandler = (req, res, next ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    next();
}

export default validateRequest;
