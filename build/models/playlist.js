"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var playlistSchema = new mongoose_1.Schema({
    owner_id: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Genre",
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.model("playlist", playlistSchema);
