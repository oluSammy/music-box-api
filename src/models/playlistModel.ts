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

playlistSchema.pre("find", async function (next) {
  try {
    this.populate({ path: "genre_id", select: "name" });
    next();
  } catch (error) {
    // eslint-disable-next-line no-console
  }
});

playlistSchema.virtual("Recently_played", {
  ref: "Recent_play",
  localField: "_id",
  foreignField: "directory_info",
  justOne: false,
  match: { isActive: false },
});

export default model<TPlaylist>("Playlist", playlistSchema);
