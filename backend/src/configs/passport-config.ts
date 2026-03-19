import { Request } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import {
    ExtractJwt,
    Strategy as JwtStrategy,
    StrategyOptions,
} from "passport-jwt";
import config from "./env-config";
import { NotFoundException } from "../utils/appErr-util";
import { ProviderEnum } from "../enums/provider-enum";
import loginOrCreateUserService from "../services/auth/loginOrCreateUser-service";
import verifyUserService from "../services/auth/verifyUser-service";
import { signJwtToken } from "../utils/jwt-util";
import { findUserByIdService } from "../services/auth/findUser-service";

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            session: false,
        },
        async (email, password, done) => {
            try {
                const user = await verifyUserService({ email, password });
                return done(null, user);
            } catch (err: any) {
                return done(err, false, { message: err?.message });
            }
        },
    ),
);

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_CALLBACK_URL,
            scope: ["profile", "email"],
            passReqToCallback: true,
        },
        async (req: Request, accessToken, refreshToken, profile, done) => {
            try {
                const { email, sub: googleId, picture } = profile._json;
                if (!googleId) {
                    throw new NotFoundException(
                        "Google ID not found in profile",
                    );
                }

                const { user } = await loginOrCreateUserService({
                    provider: ProviderEnum.GOOGLE,
                    displayName: profile.displayName,
                    providerId: googleId,
                    picture: picture,
                    email: email,
                });

                const jwt = signJwtToken({
                    userId: user._id,
                });
                req.jwt = jwt;

                done(null, user);
            } catch (err: any) {
                done(err as Error, false);
            }
        },
    ),
);

interface JwtPayload {
    userId: string;
}

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
    audience: ["user"],
    algorithms: ["HS256"],
};

passport.use(
    new JwtStrategy(options, async (payload: JwtPayload, done) => {
        try {
            const user = await findUserByIdService(payload.userId);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }),
);

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

export const passportAuthenticateJWT = passport.authenticate("jwt", {
    session: false,
});
