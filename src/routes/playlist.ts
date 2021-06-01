import express from "express";
import {
  getPlaylist,
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  getPublicPlaylists,
  removePlaylist,
  likePublicPost,
} from "../controllers/playlist";

import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/", verifyToken, getPublicPlaylists);
router.get("/:id", verifyToken, getPlaylist);
router.post("/", verifyToken, createPlaylist);
router.put("/:id", verifyToken, addToPlaylist);
router.delete("/:id", verifyToken, removeFromPlaylist);
router.delete("/delete/:id", verifyToken, removePlaylist);
router.put("/likes/:id", verifyToken, likePublicPost);

export default router;
