import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler-middleware";
import config from "../../configs/env-config";
import { UserDocument } from "../../models/user-model";

declare global {
  namespace Express {
    interface User extends UserDocument {
      _id?: any;
    }
  }
}

const googleLoginCallbackController = asyncHandler(async (req:Request, res:Response) => {
   const currentWorkspace = req.user?.currentWorkspace;
   if (!currentWorkspace) {
      return res.redirect(`${config.FRONTEND_URL}/${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`);
   }

   return res.redirect(`${config.FRONTEND_URL}/workspace/${currentWorkspace}`);
});

export default googleLoginCallbackController;