import express, { Request, Response } from "express";
import playlistRoute from "./playlist";
import usersRoute from "./users";
import genreRoutes from "./genre";
import authRouter from "./googleAuth";
import fbRouter from "./fbAuth";
import searchRoutes from "./searchSong";

const router = express.Router();

// Playlist Route
router.use("/playlist", playlistRoute);

router.get("/", (req: Request, res: Response) => {
  res.send("music-box server is live");
});

// controller for search router
router.use("/search", searchRoutes);

// controllers for users route
router.use("/users", usersRoute);

// controller for genre route
router.use("/genres", genreRoutes);

// controller for playlist

// google authentication route
// http://localhost:3000/api/v1/music-box-api/auth/google
router.use("/auth", authRouter);

// facebook authentication route
// http://localhost:3000/api/v1/music-box-api/fb/facebook
router.use("/fb", fbRouter);

// controller for user route
router.use("/users", usersRoute);

export default router;
