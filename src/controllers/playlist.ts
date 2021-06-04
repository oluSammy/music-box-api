/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import { PlaylistModel } from "../models/playlistModel";
import { TPlaylist } from "../types/types";
import ResponseStatus from "../utils/response";

const responseStatus = new ResponseStatus();

export const createPlaylist = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const playlist: TPlaylist = req.body;
    playlist.owner_id = <string>req.user!.id;
    const newPlaylist = await PlaylistModel.create(playlist);
    if (newPlaylist) {
      responseStatus.setSuccess(201, "Successful!", { payload: newPlaylist });
      return responseStatus.send(res);
    }
    responseStatus.setError(400, "Invalid input data");
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(400, "Error creating playlist");
    return responseStatus.send(res);
  }
};

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
