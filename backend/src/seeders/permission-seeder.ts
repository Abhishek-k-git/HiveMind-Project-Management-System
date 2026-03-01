import "dotenv/config";
import mongoose from "mongoose";
import connectMongo from "../configs/db-config";
import PermissionModel from "../models/permission-model";
import { RolePermissions } from "../utils/permission-util";

const seedPermissions = async () => {
   console.log("Seeding permissions...");

   try {
      await connectMongo();
      const session = await mongoose.startSession();
      session.startTransaction();
      console.log("Transaction started successfully.");

      console.log("Clearing existing permissions...");
      await PermissionModel.deleteMany({}).session(session);

      for (const roleName in RolePermissions) {
         const role = roleName as keyof typeof RolePermissions;
         const permissions = RolePermissions[role];

         const isExistingPermission = await PermissionModel.findOne({ name: role }).session(session);
         if (!isExistingPermission) {
            const newPermission = new PermissionModel({
               name: role,
               permissions: permissions
            });
            await newPermission.save({ session });
            console.log(`Seeded permissions for role: ${role}`);
         } else {
            console.log(`Permissions for role ${role} already exist. Skipping...`);
         }
      }

      await session.commitTransaction();
      console.log("Transaction committed successfully.");

      session.endSession();
      console.log("Session ended successfully.");

      console.log("Seeding completed successfully.");
   } catch (error) {
      console.error("Error seeding permissions:", error);
   }
};

seedPermissions();