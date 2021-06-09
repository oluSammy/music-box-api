/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from "express";
import Playlist from "../models/playlistModel";
import ResponseClass from "../utils/response";
import { IPlaylist } from "../types/types";

const response = new ResponseClass();

export const getPublicPlaylists = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user!.id;

    if (!currentUser) {
      response.setError(401, "Unauthorized access");
      return response.send(res);
    }

    const publicPlaylists = await Playlist.find({ isPublic: true })
      .lean()
      .exec();

    if (publicPlaylists) {
      response.setSuccess(200, "Successful!", { payload: publicPlaylists });
      return response.send(res);
    }

    response.setError(404, "No pulic playlist");
    return response.send(res);
  } catch (error) {
    response.setError(404, "Invalid request");
    return response.send(res);
  }
};

export const getPlaylist = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const playlistId = req.params.id;
    const currentUser = req.user!.id;
    const playlist = await Playlist.findById({ _id: playlistId }).lean().exec();

    if (playlist) {
      if (
        playlist.isPublic ||
        (currentUser && playlist.ownerId == currentUser)
      ) {
        response.setSuccess(200, "Successful!", { payload: playlist.tracks });
        return response.send(res);
      }

      response.setError(401, "Private playlist");
      return response.send(res);
    }

    response.setError(404, "Playlist not found");
    return response.send(res);
  } catch (error) {
    response.setError(400, "Invalid request");
    return response.send(res);
  }
};

export const createPlaylist = async (req: Request, res: Response) => {
  try {
    const playlist: IPlaylist = req.body;
    playlist.ownerId = req.user!.id as string;
    const newPlaylist = await Playlist.create(playlist);
    if (newPlaylist) {
      response.setSuccess(201, "Successful!", { payload: newPlaylist });
      return response.send(res);
    }

    response.setError(400, "Invalid input data");
    return response.send(res);
  } catch (error) {
    if (error.message.split(" ").includes("duplicate")) {
      response.setError(400, `${error.keyValue.name} already exists`);
      return response.send(res);
    }
    response.setError(400, "Error creating playlist");
    return response.send(res);
  }
};

export const addToPlaylist = async (req: Request, res: Response) => {
  try {
    const playlistId = req.params.id as string;
    const { id: newTrack } = req.body;
    const currentUser = req.user!.id as string;
    const playlist = await Playlist.findOne({
      _id: playlistId,
      ownerId: currentUser,
    }).exec();

    if (playlist && playlist.tracks) {
      const duplicate = playlist.tracks.find(
        (track) => track.trackId === newTrack
      );
      if (duplicate) {
        response.setError(400, "Track already exists");
        return response.send(res);
      }

      playlist.tracks.push(req.body);
      const saved = await playlist.save();

      if (saved) {
        response.setSuccess(201, "Successful!", { payload: saved });
        return response.send(res);
      }
    }
    response.setError(404, "Playlist not found");
    return response.send(res);
  } catch (error) {
    response.setError(400, "Error adding song to playlist");
    return response.send(res);
  }
};

export const removeFromPlaylist = async (req: Request, res: Response) => {
  try {
    const playlistId = req.params.id;
    const { id: unwantedTrack } = req.body;
    const currentUser = req.user!.id;
    const playlist = await Playlist.findById({
      _id: playlistId,
      ownerId: currentUser,
    }).exec();

    if (playlist && playlist.tracks) {
      const index = playlist.tracks.findIndex(
        (track) => track.trackId === unwantedTrack
      );
      if (index === -1) {
        response.setError(404, "Track not found");
        return response.send(res);
      }

      playlist.tracks.splice(index, 1);
      const saved = await playlist.save();

      if (saved) {
        response.setSuccess(201, "Successfully removed!", { payload: saved });
        return response.send(res);
      }
    }

    response.setError(404, "Playlist not found");
    return response.send(res);
  } catch (error) {
    response.setError(400, "Error removing song to playlist");
    return response.send(res);
  }
};

export const removePlaylist = async (req: Request, res: Response) => {
  try {
    const playlistId = req.params.id as string;
    const currentUser = req.user!.id as string;
    const deleted = await Playlist.findOneAndRemove({
      _id: playlistId,
      ownerId: currentUser,
    }).exec();

    if (deleted) {
      response.setSuccess(201, "Successfully removed!", { payload: {} });
      return response.send(res);
    }

    response.setError(404, "Playlist not found");
    return response.send(res);
  } catch (error) {
    response.setError(400, "Error removing playlist");
    return response.send(res);
  }
};

export const likePublicPost = async (
  req: Request | any,
  res: Response
): Promise<Response> => {
  try {
    const toLike = await Playlist.findOne({
      _id: req.params.id,
      isPublic: true,
      likes: { $in: [req.user._id] },
    }).exec();
    if (!toLike) {
      const addedLike = await Playlist.findOneAndUpdate(
        { _id: req.params.id, isPublic: true },
        { $push: { likes: req.user._id } },
        { new: true }
      ).exec();
      if (addedLike) {
        const newData = {
          data: addedLike,
        };
        response.setSuccess(200, "Successful", newData);
        return response.send(res);
      }
      response.setError(400, "failed");
      return response.send(res);
    }
    response.setError(400, "you can not like a playlist more than once");
    return response.send(res);
  } catch (err) {
    response.setError(400, "failed");
    return response.send(res);
  }
};
