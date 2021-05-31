"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        enum: ["local", "google", "facebook"],
    },
    password: {
        type: String,
        required: function () {
            return this.provider === "local";
        },
    },
});
var User = mongoose_1.default.model("User", userSchema);
exports.default = User;
