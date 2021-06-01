"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var playlist_1 = __importDefault(require("./playlist"));
var router = express_1.default.Router();
router.get("/", function (_req, res) {
    res.send("music-box server is live");
});
// Playlist Route
router.use("/playlist", playlist_1.default);
exports.default = router;
