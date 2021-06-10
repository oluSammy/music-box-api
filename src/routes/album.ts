import express from "express";
<<<<<<< HEAD
import { mostPlayedAlbum, getLikedAlbumsByUser } from "../controllers/album";

=======
import {
  likedAlbum,
  listenedAlbumCount,
  searchAlbum,
} from "../controllers/album";
>>>>>>> origin/staging
import verifyToken from "../middleware/auth";

const router = express.Router();

<<<<<<< HEAD
router.get("/likes", verifyToken, getLikedAlbumsByUser);
router.get("/mostplayed", verifyToken, mostPlayedAlbum);

=======
router.post("/", verifyToken, searchAlbum);
router.put("/likes/:id", verifyToken, likedAlbum);
router.put("/listened/:id", verifyToken, listenedAlbumCount);
>>>>>>> origin/staging

export default router;
