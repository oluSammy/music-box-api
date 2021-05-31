import { Schema, model } from "mongoose";
import { IUser } from "../types/types";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    enum: ["local", "google", "facebook"],
  },
  password: {
    type: String,
    required(this: IUser) {
      return this.provider === "local";
    },
  },
});
// hash password
// eslint-disable-next-line consistent-return
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return error;
  }
});
// verify password
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};
export const UserModel = model("User", userSchema);
