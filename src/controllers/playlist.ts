import { Request, Response } from "express";
import { PlaylistModel } from "../model/playlistModel";
import ResponseStatus from "../utils/response";

const responseStatus = new ResponseStatus();

export const likePublicPost = async (
  req: Request | any,
  res: Response
): Promise<Response> => {
  try {
    const toLike = await PlaylistModel.findOne({
      _id: req.params.id,
      isPublic: true,
      likes: { $in: [req.user._id] },
    }).exec();
    if (!toLike) {
      const addedLike = await PlaylistModel.findOneAndUpdate(
        { _id: req.params.id, isPublic: true },
        { $push: { likes: req.user._id } },
        { new: true }
      ).exec();
      if (addedLike) {
        const newData = {
          data: addedLike,
        };
        responseStatus.setSuccess(200, "Successful", newData);
        return responseStatus.send(res);
      }
      responseStatus.setError(400, "failed");
      return responseStatus.send(res);
    }
    responseStatus.setError(400, "you can not like a playlist more than once");
    return responseStatus.send(res);
  } catch (err) {
    responseStatus.setError(400, "failed");
    return responseStatus.send(res);
  }
};
