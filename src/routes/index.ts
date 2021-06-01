import express, { Request, Response } from "express";
import playlistRoute from "./playlist";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("music-box server is live");
});

// Playlist Route
router.use("/playlist", playlistRoute);

export default router;
