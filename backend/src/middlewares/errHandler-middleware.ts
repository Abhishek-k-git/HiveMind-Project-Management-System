import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import status from "http-status";
import { AppError } from "../utils/appErr-util";
import { z, ZodError } from "zod";

const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues?.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return res.status(status.BAD_REQUEST).json({
    message: "Validation failed",
    errors: errors,
    errorCode: "VALIDATION_ERROR",
  });
};

export const errHandlerMiddleware: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction): any => {
   if (err instanceof SyntaxError) {
      return res.status(status.BAD_REQUEST).json({ 
         message: "Bad Request",
         error: "Invalid JSON syntax" 
      });
   }

   if (err instanceof AppError) {
      return res.status(err.statusCode).json({ 
         message: err.message,
         error: err.errCode
      });
   }

   if (err instanceof ZodError) {
      return formatZodError(res, err);
   }

   return res.status(status.INTERNAL_SERVER_ERROR).json({ 
      message: "Internal Server Error",
      error: err?.message || "An unexpected error occurred"
    });
};