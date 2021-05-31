import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/types";

const userSchema = new Schema<IUser>({
  email: { type: String, require: true, unique: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  dateOfBirth: { type: Date, require: true },
  gender: { type: String, require: true },
  provider: {
    type: String,
    enum: ["local", "google", "facebook"],
  },
  password: {
    type: String,
  },
  last_login: { type: Date, default: Date.now() },
});

export const UserModel = mongoose.model("User", userSchema);
