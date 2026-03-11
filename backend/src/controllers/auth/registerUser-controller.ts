import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler-middleware";
import { registerSchema } from "../../validations/auth-validation";
import registerUserService from "../../services/auth/registerUser-service";
import status from "http-status";


const registerUserController = asyncHandler(async (req: Request, res: Response) => {
   const body = registerSchema.parse({...req.body});
   await registerUserService(body);
   
   res.status(status.CREATED).json({
      message: "User registered successfully",
   });
});

export default registerUserController;