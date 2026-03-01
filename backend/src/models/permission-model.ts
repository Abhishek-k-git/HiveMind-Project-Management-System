import mongoose, { Schema, Document } from "mongoose";
import { PermissionType, RoleType, Roles, Permissions } from "../enums/permission-enum";
import { RolePermissions } from "../utils/permission-util";

export interface PermissionDocument extends Document {
  name: RoleType;
  permissions: Array<PermissionType>;
}

const PermissionSchema = new Schema<PermissionDocument>({
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
      default: function(this: PermissionDocument) {
         return RolePermissions[this.name];
      },
   }
}, {
   timestamps: true
});

const PermissionModel = mongoose.model<PermissionDocument>("Permission", PermissionSchema);
export default PermissionModel;