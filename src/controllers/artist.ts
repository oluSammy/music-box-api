/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable eqeqeq */
// eslint-disable-next-line consistent-return
// eslint-disable-next-line no-console

import { Request, Response } from "express";
import ResponseClass from "../utils/response";
import { ArtistModel } from "../models/artistModel";
import axios from "axios";

const response = new ResponseClass();

export const getLikedArtistsByUser = async (req: Request, res: Response) => {
  try {
    const { id: currentUser } = req.user as Record<string, any>;
    const artists = await ArtistModel.find({ likes: { $in: [currentUser] } })
      .lean()
      .exec();

    if (artists) {
      if (artists.length) {
        response.setSuccess(201, "Successfully!", { payload: artists });
        return response.send(res);
      }

      response.setError(404, "User liked no artist");
      return response.send(res);
    }

    response.setError(404, "No public artist");
    return response.send(res);
  } catch (err) {
    console.error(err.message);
    response.setError(400, "Error occured during query");
    return response.send(res);
  }
};

export const mostPlayedArtist = async (req: Request, res: Response) => {
  try {
    const { id: currentUser } = req.user as Record<string, any>;

    if (!currentUser) {
      response.setError(400, "Unauthorized access");
      return response.send(res);
    }

    const mostPlayed = await ArtistModel.find({ isPublic: true })
      .sort({ listeningCount: -1 })
      .lean()
      .exec();

    response.setSuccess(200, "Successful", { payload: mostPlayed });
    return response.send(res);
  } catch (err) {
    console.error(err.message);
    response.setError(400, "Error occured during query");
    return response.send(res);
  }
};

export const addArtistById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const result = await ArtistModel.findOne({ id });
    if (result === null) {
      const getArtist = await axios.get(`https://api.deezer.com/artist/${id}`);
      const addArtist = await ArtistModel.create(getArtist.data);
      response.setSuccess(201, "successful", addArtist);
      return response.send(res);
    }
    const getArtist = await axios.get(`https://api.deezer.com/artist/${id}`);
    response.setError(
      409,
      `Artist with the id of ${getArtist.data.id} is already in the database`
    );
    return response.send(res);
  } catch (error) {
    response.setError(400, "Artist does not exist");
    return response.send(res);
  }
};

export const likeArtist = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { _id: artistId } = req.params;
    const { _id } = req.user as Record<string, any>;
    const artistProfile = await ArtistModel.findOne({ artistId });
    if (artistProfile.likedBy.includes(_id)) {
      const updateArtistProfile = await ArtistModel.findOneAndUpdate(
        { artistId },
        {
          $pull: { likedBy: _id },
          $inc: { likedCount: -1 },
        },
        { new: true }
      ).exec();
      response.setSuccess(201, "successful", updateArtistProfile);
      return response.send(res);
    }
    const updateArtistProfile = await ArtistModel.findOneAndUpdate(
      { artistId },
      {
        $push: { likedBy: _id },
        $inc: { likedCount: 1 },
      },
      { new: true }
    ).exec();
    response.setSuccess(201, "successful", updateArtistProfile);
    return response.send(res);
  } catch (err) {
    response.setError(400, "Artist does not exist");
    return response.send(res);
  }
};

export const listeningCount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const updateListeningCount = await ArtistModel.findOneAndUpdate(
      { id },
      { $inc: { listeningCount: 1 } },
      { new: true }
    ).exec();
    response.setSuccess(201, "successful", updateListeningCount);
    return response.send(res);
  } catch (err) {
    response.setError(400, "Artist does not exist");
    return response.send(res);
  }
};

export const getArtistDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const artist = await ArtistModel.findById({ _id: id });

    if (artist) {
      response.setSuccess(200, "successful", artist);
      return response.send(res);
    }

    response.setError(404, "Artist does not exist");
    return response.send(res);
  } catch (err) {
    console.log(err);
    response.setError(400, "an error occurred");
    return response.send(res);
  }
};
