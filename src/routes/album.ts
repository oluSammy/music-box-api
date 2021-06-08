import express from "express";
import { mostPlayedAlbum, getLikedAlbumsByUser } from "../controllers/album";

import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/likes", verifyToken, getLikedAlbumsByUser);
router.get("/mostplayed", verifyToken, mostPlayedAlbum);


export default router;
