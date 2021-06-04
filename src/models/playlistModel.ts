import { Schema, model } from "mongoose";
import { TPlaylist } from "../types/types";

const playlistSchema = new Schema<TPlaylist>(
  {
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
        type: String,
        unique: true,
      },
    ],
    genre_id: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
  },
  { timestamps: true }
);

export default model<TPlaylist>("Playlist", playlistSchema);
