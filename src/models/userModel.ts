import { Schema, model } from "mongoose";
import { IUser } from "../types/types";
import bcrypt from "bcryptjs";

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
// hash password
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(error.message);
  }
});
// verify password
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};
export const UserModel = model("User", userSchema);
