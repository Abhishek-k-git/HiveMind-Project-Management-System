import "dotenv/config";
import express from "express";
import cors from "cors";
// import session from "cookie-session";
import config from "./configs/env-config";

import connectMongo from "./configs/db-config";
import { errHandlerMiddleware } from "./middlewares/errHandler-middleware";
// import { asyncHandler } from "./middlewares/asyncHandler-middleware";
import passport from "passport";
import authRoutes from "./routes/auth-route";
import "./configs/passport-config";
// import isAuthenticated from "./middlewares/isAuthenticated-middleware";
import userRoutes from "./routes/user-route";
import workspaceRoutes from "./routes/workspace-route";
import memberRoutes from "./routes/member-route";
import projectRoutes from "./routes/project-route";
import taskRoutes from "./routes/task-route";
import { passportAuthenticateJWT } from "./configs/passport-config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: config.FRONTEND_URL,
        credentials: true,
    }),
);
// app.use(
//   session({
//     name: "session",
//     keys: [config.SESSION_SECRET],
//     maxAge: Number(config.SESSION_EXPIRES_IN),
//     secure: config.NODE_ENV === "production",
//     httpOnly: true,
//     sameSite: "lax",
//   }),
// );
// app.use((req: Request, res: Response, next: NextFunction) => {
//   if (req.session && !req.session.regenerate) {
//     req.session.regenerate = (cb: any) => cb();
//   }
//   if (req.session && !req.session.save) {
//     req.session.save = (cb: any) => cb();
//   }
//   next();
// });
app.use(passport.initialize());
// app.use(passport.session());

// app.get("/", asyncHandler(
//    async (req: Request, res: Response, next: NextFunction) => {
//       res.status(200).json({message: "Hello from the server!"});
//    }
// ));
app.use("/api/auth", authRoutes);
app.use("/api/users", passportAuthenticateJWT, userRoutes);
app.use("/api/workspaces", passportAuthenticateJWT, workspaceRoutes);
app.use("/api/members", passportAuthenticateJWT, memberRoutes);
app.use("/api/projects", passportAuthenticateJWT, projectRoutes);
app.use("/api/tasks", passportAuthenticateJWT, taskRoutes);

app.use(errHandlerMiddleware);

app.listen(config.PORT, async () => {
    console.log(
        `Server is listening on port ${config.PORT} in ${config.NODE_ENV} mode`,
    );
    await connectMongo();
});
