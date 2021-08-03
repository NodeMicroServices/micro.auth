export interface ICustomErrorResponse {
    message: string,
    field?: string
}

abstract class CustomError extends Error {
    abstract statusCode: number;

    protected constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    abstract serializeErrors(): ICustomErrorResponse[]
}

export default CustomError;
