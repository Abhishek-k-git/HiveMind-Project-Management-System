import "dotenv/config";
import express, {Request, Response, NextFunction} from "express";
import cors from "cors";
import session from "cookie-session";
import config from "./configs/env-config";

import connectMongo from "./configs/db-config";
import { errHandlerMiddleware } from "./middlewares/errHandler-middleware";
import { asyncHandler } from "./middlewares/asyncHandler-middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
   cors({
      origin: config.BASE_PATH
   })
)
app.use(
   session({
      name: "session",
      keys: [config.SESSION_SECRET],
      maxAge: Number(config.SESSION_EXPIRES_IN),
      secure: config.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
   })
)

app.get("/", asyncHandler(
   async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({message: "Hello from the server!"});
   }
));

app.use(errHandlerMiddleware);

app.listen(config.PORT, async () => {
   console.log(`Server is listening on port ${config.PORT} in ${config.NODE_ENV} mode`);
   await connectMongo();
});