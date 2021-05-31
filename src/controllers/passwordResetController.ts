import { Request, Response } from "express";
import {
  requestPasswordReset,
  resetPassword,
} from "../services/resetPassword.service";
import ResponseStatus from "../utils/response";

const response = new ResponseStatus();

export const requestPasswordResetController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const link = await requestPasswordReset(req.body.email);
    if (!link) {
      response.setError(400, "password reset request failed");
      return response.send(res);
    }
    response.setSuccess(200, "password reset request successful", { link });
    return response.send(res);
  } catch (error) {
    response.setError(400, "password reset request failed");
    return response.send(res);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const resp = await resetPassword(
      req.body.id,
      req.body.password,
      req.body.token
    );
    if (!resp) {
      response.setError(400, "password reset failed");
      return response.send(res);
    }
    response.setSuccess(200, "password has been reset successfully", {
      status: "successful",
    });
    return response.send(res);
  } catch (error) {
    response.setError(400, "password reset failed");
    return response.send(res);
  }
};
