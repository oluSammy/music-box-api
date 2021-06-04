import { Schema, model } from "mongoose";
import { Token } from "../types/types";

const tokenSchema = new Schema<Token>({
  token: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3540 },
});

const TokenModel = model("Token", tokenSchema);
export default TokenModel;
