"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userAuth_1 = require("../controllers/userAuth");
var router = express_1.default.Router();
router.post("/register", userAuth_1.registerUser);
exports.default = router;
