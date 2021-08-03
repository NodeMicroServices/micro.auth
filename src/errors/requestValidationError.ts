import { ValidationError } from "express-validator";

import CustomError, { ICustomErrorResponse } from "./customError";

export default class RequestValidationError extends CustomError {
    constructor(
        public statusCode = 400,
        private errors: ValidationError[]
    ) {
        super('Validating request failed.');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors = () => {
        return this.errors.map(err => {
            return {
                message: err.msg,
                field: err.param
            }
        });
    }
}