import express from "express";
import { createPlaylist, likePublicPost } from "../controllers/playlist";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/", verifyToken, createPlaylist);
router.put("/likes/:id", verifyToken, likePublicPost);

export default router;
