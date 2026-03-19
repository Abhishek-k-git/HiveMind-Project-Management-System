import userModel from "../../models/user-model";


export const findUserByIdService = async (userId: string) => {
    const user = await userModel.findById(userId, {
        password: false,
    });
    return user || null;
}