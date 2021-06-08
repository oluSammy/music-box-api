import { Response, Request } from "express";
import { artistModel } from "../models/artistModel";
import ResponseStatus from "../utils/response";
import axios from "axios";

const responseStatus = new ResponseStatus();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line consistent-return
export const addArtistById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await artistModel.findOne({ id });
    if (result === null) {
      const getArtist = await axios.get(`https://api.deezer.com/artist/${id}`);
      const addArtist = await artistModel.create(getArtist.data);
      responseStatus.setSuccess(201, "successful", addArtist);
      return responseStatus.send(res);
    }
    const getArtist = await axios.get(`https://api.deezer.com/artist/${id}`);
    responseStatus.setSuccess(
      409,
      "Artist already in database",
      getArtist.data
    );
    return responseStatus.send(res);
  } catch (error) {
    responseStatus.setError(400, "User does not exist");
    return responseStatus.send(res);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line consistent-return
export const likeArtist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const artistProfile = await artistModel.findOne({ id });
    // eslint-disable-next-line no-console
    if (artistProfile.likedBy.includes(req.user?._id)) {
      const updateArtistProfile = await artistModel
        .findOneAndUpdate(
          { id },
          {
            $pull: { likedBy: req.user?._id },
            $inc: { likedCount: -1 },
          },
          { new: true }
        )
        .exec();
      responseStatus.setSuccess(201, "successful", updateArtistProfile);
      return responseStatus.send(res);
    }
    const updateArtistProfile = await artistModel
      .findOneAndUpdate(
        { id },
        {
          $push: { likedBy: req.user?._id },
          $inc: { likedCount: 1 },
        },
        { new: true }
      )
      .exec();
    responseStatus.setSuccess(201, "successful", updateArtistProfile);
    return responseStatus.send(res);
  } catch (err) {
    responseStatus.setError(400, "Failed");
    return responseStatus.send(res);
  }
};

// eslint-disable-next-line consistent-return
export const listeningCount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateListeningCount = await artistModel
      .findOneAndUpdate({ id }, { $inc: { listeningCount: 1 } }, { new: true })
      .exec();
    responseStatus.setSuccess(201, "successful", updateListeningCount);
    return responseStatus.send(res);
  } catch (err) {
    responseStatus.setError(400, "Failed");
    return responseStatus.send(res);
  }
};
