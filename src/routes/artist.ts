import express from "express";
import { mostPlayedArtist, getLikedArtistsByUser } from "../controllers/artist";

import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/likes", verifyToken, getLikedArtistsByUser);
router.get("/mostPlayed", verifyToken, mostPlayedArtist);

export default router;
