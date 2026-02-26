import { ErrorRequestHandler } from "express";
import status from "http-status";
import { AppError } from "../utils/appErr.util";

export const errHandlerMiddleware: ErrorRequestHandler = (err, req, res, next):any => {
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

   return res.status(status.INTERNAL_SERVER_ERROR).json({ 
      message: "Internal Server Error",
      error: err?.message || "An unexpected error occurred"
    });
};