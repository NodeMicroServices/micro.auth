import CustomError from "./customError";

export default class DatabaseError extends CustomError {
    constructor(
        public statusCode = 500,
        private reason = "Connecting to DB failed."
    ) {
        super('DB Connection Error');

        Object.setPrototypeOf(this, DatabaseError.prototype);
    }

    serializeErrors = () => {
        return [{
            message: this.reason
        }];
    }

}