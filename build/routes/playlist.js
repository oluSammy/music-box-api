"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var playlist_1 = require("../controllers/playlist");
var router = express_1.default.Router();
router.get("/", playlist_1.getPublicPlaylists);
router.get("/:id", playlist_1.getPlaylist);
router.post("/", playlist_1.createPlaylist);
router.put("/:id", playlist_1.addToPlaylist);
router.delete("/:id", playlist_1.removeFromPlaylist);
router.delete("/delete/:id", playlist_1.removePlaylist);
exports.default = router;
