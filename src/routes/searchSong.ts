import express from "express";
import { searchQuery, searchPlaylist } from "../controllers/search";

const router = express.Router();

router.get("/", searchQuery);
router.get("/:id", searchPlaylist);

export default router;
