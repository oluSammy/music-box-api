import express from "express";
import { getOneGenre, getGenres } from "../controllers/genre";

const router = express.Router();

// route to get all genres
router.get("/", getGenres);
// route to get a genre by the deezer id
router.get("/:id", getOneGenre);

export default router;
