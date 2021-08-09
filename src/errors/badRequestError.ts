import CustomError from "./customError";

export default class BadRequestError extends CustomError {
    constructor(
        public message: string,
        public statusCode = 400,
    ) {
        super(`Bad Request: ${message}`);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors = () => {
        return [{
            message: this.message
        }];
    }

}
