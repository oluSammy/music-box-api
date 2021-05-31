import express from "express";
import usersRoute from "./users";
import genreRoutes from "./genre";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("music-box server is live");
});

// controllers for users route
router.use("/users", usersRoute);

// controller for genre route
router.use("/genres", genreRoutes);

export default router;
