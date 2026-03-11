import { Router } from "express";
import passport from "passport";
import config from "../configs/env-config";
import loginUserController from "../controllers/auth/loginUser-controller";
import registerUserController from "../controllers/auth/registerUser-controller";
import logoutUserController from "../controllers/auth/logoutUser-controller";
import googleLoginCallbackController from "../controllers/auth/googleLoginCallback-controller";

const authRoutes = Router();

authRoutes.post("/login", loginUserController);
authRoutes.post("/register", registerUserController);
authRoutes.post("/logout", logoutUserController);

authRoutes.get("/google", 
   passport.authenticate("google", {
      scope: ["profile", "email"]
   })
);
authRoutes.get("/google/callback", 
   passport.authenticate("google", {
      failureRedirect: `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
   }), 
   googleLoginCallbackController
);

export default authRoutes;