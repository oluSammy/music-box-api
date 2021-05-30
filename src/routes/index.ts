import express, { Request, Response } from "express";
import usersRoute from "./users";
import authRouter from "./googleAuth";
import fbRouter from "./fbAuth";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("music-box server is live");
});

// google authentication route
router.use("/auth", authRouter);

// facebook authentication route
router.use("/fb", fbRouter);
router.use("/users", usersRoute);

export default router;
