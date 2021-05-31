"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passwordResetController_1 = require("../controllers/passwordResetController");
// import { UserModel } from "../models/userModel";
var router = express_1.Router();
router.post("/requestPasswordReset", passwordResetController_1.requestPasswordResetController);
router.put("/resetPassword", passwordResetController_1.resetPasswordController);
// router.post("/api/signup", async (req: Request, res: Response) => {
//   const user = new UserModel({ ...req.body });
//   try {
//     const resp = await user.save();
//     return res.status(201).json(resp);
//   } catch (error) {
//     return res.status(400).send("signup failed");
//   }
// });
exports.default = router;
