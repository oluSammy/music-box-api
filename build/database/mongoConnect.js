"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
var mongoose_1 = __importDefault(require("mongoose"));
var message = process.env.NODE_ENV === "production"
    ? "Successfully connected to MongoDB Atlas!"
    : "Successfully connected to MongoDB Local!";
var connectDB = function () {
    var url = process.env.NODE_ENV === "production"
        ? process.env.DATABASE_URL
        : "mongodb://127.0.0.1:27017/music-box";
    mongoose_1.default
        .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
        .then(function () {
        console.log("info", message);
    })
        .catch(function (error) {
        console.log("error", error.message);
    });
};
exports.default = connectDB;
