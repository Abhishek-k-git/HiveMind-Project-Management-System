import {Request, Response} from 'express';
import { asyncHandler } from "../../middlewares/asyncHandler-middleware";
import status from "http-status";

const logoutUserController = asyncHandler(async (req: Request, res: Response) => {
   req.logout((err) => {
      if (err) {
         return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "Failed to log out user",
         });
      }
   });

   req.session = null;
   return res.status(status.OK).json({
      message: "User logged out successfully",
   });
});

export default logoutUserController;