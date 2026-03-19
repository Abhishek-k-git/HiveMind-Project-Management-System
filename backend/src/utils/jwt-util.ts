import jwt, { SignOptions } from "jsonwebtoken";
import { UserDocument } from "../models/user-model";
import config from "../configs/env-config";

export type AccessTPayload = {
    userId: UserDocument["_id"];
};

type SignOptsAndSecret = SignOptions & {
    secret: string;
};

const defaults: SignOptions = {
    audience: ["user"],
};

export const accessTokenSignOptions: SignOptsAndSecret = {
    secret: config.JWT_SECRET,
    expiresIn: Number(config.JWT_EXPIRES_IN),
};

export const signJwtToken = (
    payload: AccessTPayload,
    options?: SignOptsAndSecret,
) => {
    const { secret, ...opts } = options || accessTokenSignOptions;
    return jwt.sign(payload, secret, {
        ...defaults,
        ...opts,
    })
}
