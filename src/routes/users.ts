import express from "express";
import { updateProfile } from "../controllers/updateProfile";
import { viewProfile } from "../controllers/viewProfile";
import verifyToken from "../middleware/auth";
import { loginUser, registerUser } from "../controllers/userAuth";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("users route");
});

router.get("/profile/:id", verifyToken, viewProfile);
router.put("/profile/:id", verifyToken, updateProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
