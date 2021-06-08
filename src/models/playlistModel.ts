import { Schema, model } from "mongoose";
import { IPlaylist } from "../types/types";

const playlistSchema = new Schema<IPlaylist>(
  {
    ownerId: {
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
        trackId: Number,
        title: String,
      },
    ],
    genreId: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    listeningCount: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<IPlaylist>("Playlist", playlistSchema);
