import mongoose from "mongoose";
import config from "./env-config";

const connectMongo = async () => {
   try {
      await mongoose.connect(config.DATABASE_URL);
      console.log("Database connected successfully");
   } catch (error) {
      console.error("Database connection failed");
      process.exit(1);
   }
};

export default connectMongo;