import { ProviderEnum } from "../../enums/provider-enum";
import AccountModel from "../../models/account-model";
import UserModel from "../../models/user-model";
import { NotFoundException, UnauthorizedException } from "../../utils/appErr-util";

const verifyUserService = async ({
   email,
   password,
   provider = ProviderEnum.EMAIL
}: {
   email: string;
   password: string;
   provider?: string;
}) => {
   const account = await AccountModel.findOne({ provider, providerId: email });
   if (!account) {
      throw new NotFoundException("Invalid email or password");
   }

   const user = await UserModel.findById(account.userId);
   if (!user) {
      throw new NotFoundException("Invalid email or password");
   }

   const isMatch = await user.comparePassword(password);
   if (!isMatch) {
      throw new UnauthorizedException("Invalid email or password");
   }

   return user.omitPassword();
};

export default verifyUserService;