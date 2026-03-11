import mongoose from "mongoose";
import UserModel from "../../models/user-model";
import AccountModel from "../../models/account-model";
import WorkspaceModel from "../../models/workspace-model";
import PermissionModel from "../../models/permission-model";
import MemberModel from "../../models/member-model";
import { BadRequestException, NotFoundException } from "../../utils/appErr-util";
import { ProviderEnum } from "../../enums/provider-enum";
import { Roles } from "../../enums/permission-enum";

const registerUserService = async (body: {
   email: string;
   password: string;
   name: string;
 }) => {
   const { email, name, password } = body;
   const session = await mongoose.startSession();

   try {
      session.startTransaction();

      const existingUser = await UserModel.findOne({ email }).session(session);
      if (existingUser) {
         throw new BadRequestException("User with this email already exists");
      }

      const newUser = new UserModel({
         email,
         name,
         password,
      });
      await newUser.save({ session });

      const account = new AccountModel({
         userId: newUser._id,
         provider: ProviderEnum.EMAIL,
         providerId: email,
      });
      await account.save({ session });

      const workspace = new WorkspaceModel({
         name: `${name}'s Workspace`,
         description: `Personal workspace for ${name}`,
         owner: newUser._id,
      });
      await workspace.save({ session });

      const ownerRole = await PermissionModel.findOne({
         name: Roles.OWNER,
      }).session(session);
      if (!ownerRole) {
         throw new NotFoundException("Owner role not found in permissions collection");
      }

      const member = new MemberModel({
         userId: newUser._id,
         workspaceId: workspace._id,
         role: ownerRole._id,
         joinedAt: new Date(),
      });
      await member.save({ session });

      newUser.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
      await newUser.save({ session });

      await session.commitTransaction();
      session.endSession();

   } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
   }
};

export default registerUserService;