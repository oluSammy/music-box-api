"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./users"));
var googleAuth_1 = __importDefault(require("./googleAuth"));
var fbAuth_1 = __importDefault(require("./fbAuth"));
var router = express_1.default.Router();
router.get("/", function (req, res) {
    res.send("music-box server is live");
});
// google authentication route
router.use("/auth", googleAuth_1.default);
// facebook authentication route
router.use("/fb", fbAuth_1.default);
router.use("/users", users_1.default);
exports.default = router;
