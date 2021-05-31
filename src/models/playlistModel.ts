import mongoose, { model, Schema } from "mongoose";
import { Playlist } from "../types/types";

const playlistSchema = new Schema<Playlist>(
  {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    owner_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      unique: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    tracks: [
      {
        type: Schema.Types.ObjectId,
        ref: "track",
        unique: true,
      },
    ],
    genre_id: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const PlaylistModel = model<Playlist>("playlist", playlistSchema);
