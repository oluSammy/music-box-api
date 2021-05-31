import express from "express";
import { changePassword } from "../controllers/users";

const router = express.Router();

// route for users
router.get("/", (req, res) => {
  res.send("users route");
});

// controller route to change user password
router.put("/change-password/:id", changePassword);

export default router;
