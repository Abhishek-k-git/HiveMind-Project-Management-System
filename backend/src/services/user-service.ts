import userModel from "../models/user-model";
import { BadRequestException } from "../utils/appErr-util";


export const getCurrentUserService = async (userId: string) => {
   const user = await userModel.findById(userId)
      .populate("currentWorkspace")
      .select("-password");

   if (!user) {
      throw new BadRequestException("User not found");
   }
   return { user };  
};