import express from "express";
import {
  getPlaylist,
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  getPublicPlaylists,
  removePlaylist,
  likePublicPost,
  getLikedPlaylistsByUser,
  mostPlayedPlaylist,
} from "../controllers/playlist";

import verifyToken from "../middleware/auth";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, getPublicPlaylists)
  .post(verifyToken, createPlaylist);

router
  .route("/:id")
  .get(verifyToken, getPlaylist)
  .put(verifyToken, addToPlaylist)
  .delete(verifyToken, removeFromPlaylist);

router.get("/mostPlayed", mostPlayedPlaylist);
router.get("/likes", getLikedPlaylistsByUser);
router.put("/likes/:id", verifyToken, likePublicPost);
router.delete("/delete/:id", verifyToken, removePlaylist);

export default router;
