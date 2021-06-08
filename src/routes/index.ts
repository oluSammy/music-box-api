import express, { Request, Response } from "express";
import playlistRoute from "./playlist";
import usersRoute from "./users";
import genreRoutes from "./genre";
import artistRoute from "./artist";
import albumRoute from "./album";
import authRouter from "./googleAuth";
import fbRouter from "./fbAuth";

const router = express.Router();

// controllers for playlist route
router.use("/playlist", playlistRoute);

// controllers for album route
router.use("/album", albumRoute);

// controllers for artist route
router.use("/artist", artistRoute);

// controllers for users route
router.use("/users", usersRoute);

// controller for genre route
router.use("/genres", genreRoutes);

// google authentication route
// http://localhost:3000/api/v1/music-box-api/auth/google
router.use("/auth", authRouter);

// facebook authentication route
// http://localhost:3000/api/v1/music-box-api/fb/facebook
router.use("/fb", fbRouter);

// Root Route
router.get("/", (_req: Request, res: Response) => {
  res.send("music-box server is live");
});

export default router;
