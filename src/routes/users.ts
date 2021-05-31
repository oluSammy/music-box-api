import express from "express";
import { updateProfile } from "../controllers/updateProfile";
import { viewProfile } from "../controllers/viewProfile";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("users route");
});

router.get("/profile/:id", verifyToken, viewProfile);
router.put("/profile/:id", verifyToken, updateProfile);

export default router;
