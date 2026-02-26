import mongoose, {Document, Schema} from "mongoose";
import {hashPass, comparePass} from "../utils/bcrypt.util";

export interface UserDocument extends Document {
    name: string;
    email: string;
    password?: string;
    profilePicture?: string;
    currentWorkspace?: mongoose.Types.ObjectId;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (value: string) => Promise<boolean>;
    omitPassword(): Omit<UserDocument, "password">;
}

const userSchema = new Schema<UserDocument>({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
   },
   password: {
      type: String
   },
   profilePicture: {
      type: String,
      default: null
   },
   currentWorkspace: {
      type: mongoose.Types.ObjectId,
      ref: "Workspace",
      default: null
   },
   isActive: {
      type: Boolean,
      default: true
   },
   lastLogin: {
      type: Date,
      default: null
   }
}, {
   timestamps: true
});

userSchema.pre<UserDocument>("save", async function(next) {
   if (this.isModified("password") && this.password) {
      this.password = await hashPass(this.password);
   }
});

userSchema.methods.comparePassword = async function(value: string): Promise<boolean> {
   return comparePass(value, this.password);
}

userSchema.methods.omitPassword = function(): Omit<UserDocument, "password"> {
   const user = this.toObject();
   delete user.password;
   return user;
}

const userModel = mongoose.model<UserDocument>("User", userSchema);
export default userModel;