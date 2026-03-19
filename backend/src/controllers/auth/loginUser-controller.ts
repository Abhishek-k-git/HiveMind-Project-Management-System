import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler-middleware";
import passport from "passport";
import status from "http-status";
import { signJwtToken } from "../../utils/jwt-util";

const loginUserController = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate(
            "local",
            (
                err: Error | null,
                user: Express.User | false,
                info: { message: string } | undefined,
            ) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(status.UNAUTHORIZED).json({
                        message: info?.message || "Invalid email or password",
                    });
                }

                // req.logIn(user, (err) => {
                //    if (err) { return next(err); }

                //    return res.status(status.OK).json({
                //       message: "User logged in successfully",
                //       user,
                //    });
                // });
                const access_token = signJwtToken({ userId: user._id });

                return res.status(status.OK).json({
                    message: "User logged in successfully",
                    access_token,
                    user,
                });
            },
        )(req, res, next);
    },
);

export default loginUserController;
