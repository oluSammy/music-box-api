import express, { Request, Response } from "express";
import playlistRoute from "./playlist";
import usersRoute from "./users";
import genreRoutes from "./genre";
import albumRoutes from "./album";
import authRouter from "./googleAuth";
import fbRouter from "./fbAuth";
import historyRoute from "./history";
import recentlyPlayedRoutes from "./recentlyPlayed";
import artistRoute from "./artist";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("music-box server is live");
});

// controllers for users route
router.use("/users", usersRoute);

// controller for genre route
router.use("/genres", genreRoutes);

// Playlist Route
router.use("/playlist", playlistRoute);
// controller for artist route
router.use("/artists", artistRoute);

// controller for playlist

// controller for album
router.use("/album", albumRoutes);
// google authentication route
// http://localhost:3000/api/v1/music-box-api/auth/google
router.use("/auth", authRouter);

// facebook authentication route
// http://localhost:3000/api/v1/music-box-api/fb/facebook
router.use("/fb", fbRouter);

// listening history route
router.use("/history", historyRoute);
// controller for recently played music
router.use("/recently-played", recentlyPlayedRoutes);

export default router;
