import express, { Request, Response } from "express";
import usersRoute from "./users";
import genreRoutes from "./genre";
import authRouter from "./googleAuth";
import fbRouter from "./fbAuth";
import playlistRouter from "./playlist";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("music-box server is live");
});

// controllers for users route
router.use("/users", usersRoute);

// controller for genre route
router.use("/genres", genreRoutes);

// controller for playlist
router.use("/playlist", playlistRouter);

// google authentication route
// http://localhost:3000/api/v1/music-box-api/auth/google
router.use("/auth", authRouter);

// facebook authentication route
// http://localhost:3000/api/v1/music-box-api/fb/facebook
router.use("/fb", fbRouter);

router.use("/users", usersRoute);

export default router;
