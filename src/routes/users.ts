import express from "express";
import { createPlaylist, likePublicPost } from "../controllers/playlist";
import { loginUser, registerUser } from "../controllers/userAuth";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/playlist", verifyToken, createPlaylist);
router.put("/playlist/likes/:id", verifyToken, likePublicPost);

export default router;
