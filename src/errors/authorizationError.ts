import CustomError, { ICustomErrorResponse } from "./customError";

export default class AuthorizationError extends CustomError {
    constructor(
        public statusCode = 401,
        private reason = "Unauthorized Request."
    ) {
        super('401 - Unauthorized Request');
        Object.setPrototypeOf(this, AuthorizationError.prototype);
    }

    serializeErrors(): ICustomErrorResponse[] {
        return [{
            message: this.reason
        }];
    }
}
