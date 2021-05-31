import { Request, Response } from "express";
import { UserModel } from "../model/userModel";
import { generateToken } from "../utils/auth";
import ResponseStatus from "../utils/response";

const responseStatus = new ResponseStatus();

export async function loginUser(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user && (await user.isPassowrdMatch(password))) {
      const data = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        password,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        token: generateToken(user._id),
      };
      responseStatus.setSuccess(201, "success", data);
      return responseStatus.send(res);
    }
    responseStatus.setError(400, "Invalid Credentials");
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(400, "Invalid Credentials");
    return responseStatus.send(res);
  }
}
