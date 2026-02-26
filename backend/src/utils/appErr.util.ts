import status from "http-status";

export class AppError extends Error {
   public statusCode: number;
   public errCode?: string;

   constructor(
      message: string,
      statusCode: number = status.INTERNAL_SERVER_ERROR,
      errCode?: string
   ) {
      super(message);
      this.statusCode = statusCode;
      this.errCode = errCode;
      Error.captureStackTrace(this, this.constructor);
   }
}

export class InternalServerException extends AppError {
   constructor(
      message = "Internal Server Error",
      errCode = "INTERNAL_SERVER_ERROR"
   ) {
      super(message, status.INTERNAL_SERVER_ERROR, errCode);
   }
}

export class BadRequestException extends AppError {
   constructor(
      message = "Bad Request",
      errCode = "BAD_REQUEST_ERROR"
   ) {
      super(message, status.BAD_REQUEST, errCode);
   }
}

export class NotFoundException extends AppError {
   constructor(
      message = "Resource Not Found",
      errCode = "NOT_FOUND_ERROR"
   ) {
      super(message, status.NOT_FOUND, errCode);
   }
}

export class UnauthorizedException extends AppError {
   constructor(
      message = "Unauthorized Access",
      errCode = "UNAUTHORIZED_ERROR"
   ) {
      super(message, status.UNAUTHORIZED, errCode);
   }
}

export class CustomException extends AppError {
   constructor(
      message = "Custom Exception Error",
      statusCode: number,
      errCode = "CUSTOM_EXCEPTION_ERROR"
   ) {
      super(message, statusCode, errCode);
   }
}
