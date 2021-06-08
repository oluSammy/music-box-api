/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
import { Request, Response } from "express";
import Album from "../models/albumModel";
import ResponseClass from "../utils/response";

const response = new ResponseClass();

export const getLikedAlbumsByUser = async (req: Request, res: Response) => {
  try {
    const { id: currentUser } = req.user as Record<string, any>;
    const albums = await Album.find({}).lean().exec();

    if (albums && albums.length) {
      const userAlbums = albums.filter((album: any) => {
        return (
          album.likes && album.likes.some((like: string) => like == currentUser)
        );
      });

      if (userAlbums.length) {
        response.setSuccess(201, "Successfully!", { payload: userAlbums });
        return response.send(res);
      }

      response.setError(404, "User liked no album");
      return response.send(res);
    }

    response.setError(404, "Playlist is empty");
    return response.send(res);
  } catch (err) {
    console.error(err.message);
    response.setError(400, "Error occured during query");
    return response.send(res);
  }
};

export const mostPlayedAlbum = async (req: Request, res: Response) => {
  try {
    const { id: currentUser } = req.user as Record<string, any>;

    if (!currentUser) {
      response.setError(400, "Unauthorized access");
      return response.send(res);
    }

    const mostPlayed = await Album.find({ isPublic: true })
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
