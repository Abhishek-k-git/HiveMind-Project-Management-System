import mongoose, { Schema, Document } from "mongoose";
import { PermissionType, RoleType, Roles, Permissions } from "../enums/permission-enum";
import { RolePermissions } from "../utils/permission-util";

export interface RoleDocument extends Document {
  name: RoleType;
  permissions: Array<PermissionType>;
}

const roleSchema = new Schema<RoleDocument>({
   name: {
      type: String,
      enum: Object.values(Roles),
      required: true,
      unique: true,
   },
   permissions: {
      type: [String],
      enum: Object.values(Permissions),
      required: true,
      default: function(this: RoleDocument) {
         return RolePermissions[this.name];
      },
   }
}, {
   timestamps: true
});

const RoleModel = mongoose.model<RoleDocument>("Role", roleSchema);
export default RoleModel;