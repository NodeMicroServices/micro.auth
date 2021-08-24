import CustomError, { ICustomErrorResponse } from "./customError";

export default class NotFoundError extends CustomError {
    constructor(
        public statusCode = 404,
        private reason = "Path not found - 404."
    ) {
        super('404');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(): ICustomErrorResponse[] {
        return [{
            message: this.reason
        }];
    }
}
