"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var playlist_1 = require("../controllers/playlist");
var auth_1 = __importDefault(require("../middleware/auth"));
var router = express_1.default.Router();
router.post("/", auth_1.default, playlist_1.createPlaylist);
router.put("/likes/:id", auth_1.default, playlist_1.likePublicPost);
exports.default = router;
