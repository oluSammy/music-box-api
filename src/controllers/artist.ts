/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable eqeqeq */
import { Request, Response } from "express";
import Artist from "../models/artistModel";
import ResponseClass from "../utils/response";

const response = new ResponseClass();

export const getLikedArtistsByUser = async (req: Request, res: Response) => {
  try {
    const { id: currentUser } = req.user as Record<string, any>;
    const artists = await Artist.find({}).lean().exec();

    if (artists && artists.length) {
      const userArtists = artists.filter((artist: any) => {
        return (
          artist.likes &&
          artist.likes.some((like: string) => like == currentUser)
        );
      });

      if (userArtists.length) {
        response.setSuccess(201, "Successfully!", { payload: userArtists });
        return response.send(res);
      }

      response.setError(404, "User liked no album");
      return response.send(res);
    }

    response.setError(404, "Artist is empty");
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

    const mostPlayed = await Artist.find({ isPublic: true })
      .sort({ listeningCount: -1 })
      .limit(5)
      .lean()
      .exec();

    return mostPlayed;
  } catch (err) {
    console.error(err.message);
    response.setError(400, "Error occured during query");
    return response.send(res);
  }
};
