import express from "express";
import {
  getPlaylist,
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  getPublicPlaylists,
  removePlaylist,
} from "../controllers/playlist";

const router = express.Router();

router.get("/", getPublicPlaylists);
router.get("/:id", getPlaylist);
router.post("/", createPlaylist);
router.put("/:id", addToPlaylist);
router.delete("/:id", removeFromPlaylist);
router.delete("/delete/:id", removePlaylist);

export default router;
