"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./users"));
var genre_1 = __importDefault(require("./genre"));
var googleAuth_1 = __importDefault(require("./googleAuth"));
var fbAuth_1 = __importDefault(require("./fbAuth"));
var router = express_1.default.Router();
router.get("/", function (req, res) {
    res.send("music-box server is live");
});
// controllers for users route
router.use("/users", users_1.default);
// controller for genre route
router.use("/genres", genre_1.default);
router.get("/", function (req, res) {
    res.send("music-box server is live");
});
// google authentication route
// http://localhost:3000/api/v1/music-box-api/auth/google
router.use("/auth", googleAuth_1.default);
// facebook authentication route
// http://localhost:3000/api/v1/music-box-api/fb/facebook
router.use("/fb", fbAuth_1.default);
router.use("/users", users_1.default);
exports.default = router;
