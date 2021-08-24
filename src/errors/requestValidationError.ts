import { ValidationError } from "express-validator";

import CustomError, { ICustomErrorResponse } from "./customError";

export default class RequestValidationError extends CustomError {
    constructor(
        private errors: ValidationError[],
        public statusCode = 400
    ) {
        super('Validating request failed.');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors = (): ICustomErrorResponse[] => {
        return this.errors.map(err => {
            return {
                message: err.msg,
                field: err.param
            }
        });
    }
}
