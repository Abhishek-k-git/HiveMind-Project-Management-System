import mongoose, { Document, Schema } from 'mongoose';
import { ProviderEnum, ProviderEnumType } from '../enums/provider-enum';

export interface AccountDocument extends Document {
      provider: ProviderEnumType;
      providerId: string;
      userId: mongoose.Types.ObjectId;
      refreshToken?: string;
      tokenExpiresAt?: Date;
      createdAt: Date;
      updatedAt: Date;
}

const accountSchema = new Schema<AccountDocument>({
   provider: {
      type: String,
      enum: Object.values(ProviderEnum),
      required: true,
   },
   providerId: {
      type: String,
      required: true,
      unique: true,
   },
   userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   refreshToken: {
      type: String,
      default: null,
   },
   tokenExpiresAt: {
      type: Date,
      default: null,
   },
}, {
   timestamps: true,
   toJSON: {
      transform: function (doc, ret) {         
         delete ret.refreshToken;
         delete ret.tokenExpiresAt;
      }
   }
});

const AccountModel = mongoose.model<AccountDocument>('Account', accountSchema);
export default AccountModel;