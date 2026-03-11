import mongoose from "mongoose";
import UserModel from "../../models/user-model";
import AccountModel from "../../models/account-model";
import WorkspaceModel from "../../models/workspace-model";
import PermissionModel from "../../models/permission-model";
import MemberModel from "../../models/member-model";
import { Roles } from "../../enums/permission-enum";
import { NotFoundException } from "../../utils/appErr-util";

const loginOrCreateUserService = async (data: {
   provider: string;
   displayName: string;
   providerId: string;
   picture?: string;
   email?: string;
}) => {
   const { provider, displayName, providerId, picture, email } = data;
   const session = await mongoose.startSession();
   try {
      session.startTransaction();

      let user = await UserModel.findOne({ email }).session(session);
      if (!user) {
         user = new UserModel({
            email,
            name: displayName,
            profilePicture: picture || null,
         });
         await user.save({ session });

         const account = new AccountModel({
            userId: user._id,
            provider,
            providerId,
         });
         await account.save({ session });

         const workspace = new WorkspaceModel({
            name: `${displayName}'s Workspace`,
            description: `Personal workspace for ${displayName}`,
            owner: user._id,
         });
         await workspace.save({ session });

         const ownerRole = await PermissionModel.findOne({
            name: Roles.OWNER,
         }).session(session);
         if (!ownerRole) {
            throw new NotFoundException("Owner role not found in permissions collection");
         }

         const memeber = new MemberModel({
            userId: user._id,
            workspaceId: workspace._id,
            role: ownerRole._id,
            joinedAt: new Date(),
         });
         await memeber.save({ session });

         user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
         await user.save({ session });
      }

      await session.commitTransaction();
      session.endSession();

      return { user };
   } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
   } finally {
      session.endSession();
   }
}

export default loginOrCreateUserService;