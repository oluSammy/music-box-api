import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import ResponseStatus from "../utils/response";

const responseStatus = new ResponseStatus();

export const updateProfile = async (req: Request, res: Response) => {
  try {
      if(req.body.password){
        responseStatus.setError(404, "you cannot update password");
        return responseStatus.send(res)
      }
    const { id } = req.params;

    const updateUserProfile = await UserModel.findByIdAndUpdate(
      id,
      req.body,
      function (err: any, docs: any) {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
        }
      }
    );
        responseStatus.setSuccess(200, "success", updateUserProfile);
        return responseStatus.send(res);
  } catch (error) {
    console.log(error);
  }
};
