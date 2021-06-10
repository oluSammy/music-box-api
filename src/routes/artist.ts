import express from "express";
<<<<<<< HEAD
import { mostPlayedArtist, getLikedArtistsByUser } from "../controllers/artist";

import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/likes", verifyToken, getLikedArtistsByUser);
router.get("/mostPlayed", verifyToken, mostPlayedArtist);
=======
import verifyToken from "../middleware/auth";
import {
  addArtistById,
  likeArtist,
  listeningCount,
} from "../controllers/artist";

const router = express.Router();

// route to get artist by id
router.get("/id/:id", verifyToken, addArtistById);

// route to increase like count and add id of users that like
router.put("/like/:id", verifyToken, likeArtist);

// route to increase listening count
router.put("/listened/:id", verifyToken, listeningCount);
>>>>>>> origin/staging

export default router;
