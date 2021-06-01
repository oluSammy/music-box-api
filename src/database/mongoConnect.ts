/* eslint-disable no-console */
import mongoose from "mongoose";

const message =
  process.env.NODE_ENV === "production"
    ? "Successfully connected to MongoDB Atlas!"
    : "Successfully connected to MongoDB Local!";

const connectDB = (): void => {
  const url: string =
    process.env.NODE_ENV === "production"
      ? (process.env.DATABASE_URL as string)
      : "mongodb://127.0.0.1:27017/music-box";
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("info", message);
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};
export default connectDB;
