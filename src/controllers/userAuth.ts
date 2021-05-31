import { validateUser } from "../middleware/joiValidate";
import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { generateToken } from "../utils/auth";
import ResponseStatus from "../utils/response";

const responseStatus = new ResponseStatus();

export const registerUser = async function (
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      responseStatus.setError(401, error.message);
      return responseStatus.send(res);
    }
    const { email, password, firstName, lastName, dateOfBirth, gender } =
      req.body;
    const exist = await UserModel.findOne({ email });
    if (exist) {
      responseStatus.setError(409, "user exist");
      return responseStatus.send(res);
    }

    const newUser = await new UserModel({
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      last_login: "",
    });
    await newUser.save();

    const token = generateToken(newUser._id);
    responseStatus.setSuccess(201, "successful", { data: newUser, token });
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(401, "invalid credentials");
    return responseStatus.send(res);
  }
};
