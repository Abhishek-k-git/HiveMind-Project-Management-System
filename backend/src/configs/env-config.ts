import { getEnv } from "../utils/getEnv-util";

const config = () => ({
   PORT: getEnv("PORT", "8080"),
   NODE_ENV: getEnv("NODE_ENV", "development"),
   DATABASE_URL: getEnv("DATABASE_URL", ""),

   SESSION_SECRET: getEnv("SESSION_SECRET"),
   SESSION_EXPIRES_IN: getEnv("SESSION_EXPIRES_IN"),

   GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
   GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
   GOOGLE_CALLBACK_URL: getEnv("GOOGLE_CALLBACK_URL"),

   FRONTEND_URL: getEnv("FRONTEND_URL", "localhost"),
   FRONTEND_GOOGLE_CALLBACK_URL: getEnv("FRONTEND_GOOGLE_CALLBACK_URL")
});

export default config();