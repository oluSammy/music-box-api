import express from "express";
import passwordResetRouter from "./passwordResetRoutes";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("users route");
});
router.use("/", passwordResetRouter);

export default router;
