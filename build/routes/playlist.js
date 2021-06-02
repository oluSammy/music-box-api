"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var playlist_1 = require("../controllers/playlist");
var auth_1 = __importDefault(require("../middleware/auth"));
var router = express_1.default.Router();
router.get("/", auth_1.default, playlist_1.getPublicPlaylists);
router.get("/:id", auth_1.default, playlist_1.getPlaylist);
router.post("/", auth_1.default, playlist_1.createPlaylist);
router.put("/:id", auth_1.default, playlist_1.addToPlaylist);
router.delete("/:id", auth_1.default, playlist_1.removeFromPlaylist);
router.delete("/delete/:id", auth_1.default, playlist_1.removePlaylist);
router.put("/likes/:id", auth_1.default, playlist_1.likePublicPost);
exports.default = router;
