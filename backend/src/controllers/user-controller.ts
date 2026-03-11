import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler-middleware';
import status from 'http-status';
import { getCurrentUserService } from '../services/user-service';

export const getCurrentUserController = asyncHandler(async (req: Request, res: Response) => {
   const userId = req.user?._id;
   const {user} = await getCurrentUserService(userId);
   res.status(status.OK).json({
      message: "User fetched successfully",
      user,
   });
});