import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import ResponseStatus from "../utils/response";

const responseStatus = new ResponseStatus();

export const viewProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    if(id) {
        const viewUserProfile = await UserModel.findById(id);
        responseStatus.setSuccess(200, "success", viewUserProfile);
        return responseStatus.send(res);
    } else{
        responseStatus.setError(404, "Cannot find user");
        return responseStatus.send(res)
    }
  } catch (err) {
    console.log(err);
  }
};
