import express from "express";
import {
  likedAlbum,
  listenedAlbumCount,
  searchAlbum,
} from "../controllers/album";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/", verifyToken, searchAlbum);
router.put("/likes/:id", verifyToken, likedAlbum);
router.put("/listened/:id", verifyToken, listenedAlbumCount);

export default router;
