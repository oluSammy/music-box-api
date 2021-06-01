import bcrypt from "bcryptjs";
import crypto from "crypto";
import { UserModel } from "../models/userModel";
import Token from "../models/token.model";
import sendEmail from "../utils/mail/sendEmail";

export const requestPasswordReset = async (email: string): Promise<unknown> => {
  // Check if the user exists
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User with this email does not exist");

  // Check if there is an existing token for that user and delete if there is
  const token = await Token.findOne({ userId: user._id });
  if (token) await Token.deleteOne();

  // Generate a new random token with the crypto API and hash it
  const newToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = await bcrypt.hash(
    newToken,
    Number(process.env.BCRYPT_SALT)
  );

  // save the new token
  await new Token({
    userId: user._id,
    token: tokenHash,
    createdAt: Date.now(),
  }).save();

  // ClientURL to be added later
  const link = "clientUrl/resetPassword?token=newToken&id=user._id";
  sendEmail(
    user.email,
    "Password Reset",
    { name: user.firstName, newToken },
    "requestMail.hbs"
  );
  return { link, newToken };
};

export const resetPassword = async (
  id: string,
  password: string,
  token: string
): Promise<unknown> => {
  // check if token exists and is valid
  const userToken = await Token.findOne({ userId: id });
  const validateToken = await bcrypt.compare(token, userToken.token);
  if (!userToken || !validateToken) throw new Error("Invalid or expired token");
  const newPassword = await bcrypt.hash(password, 10);
  await UserModel.findByIdAndUpdate(
    id,
    {
      $set: {
        password: newPassword,
      },
    },
    { new: true }
  );

  // Notify user of successful change

  const user = await UserModel.findOne({ _id: id });
  sendEmail(
    user.email,
    "Password Reset Successfully",
    { name: user.firstName },
    "resetSuccessMail.hbs"
  );

  // Deleted created token once password has been reset
  await userToken.deleteOne();
  return true;
};
