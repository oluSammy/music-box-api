"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var tokenSchema = new mongoose_1.Schema({
    token: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3540 },
});
var TokenModel = mongoose_1.model("Token", tokenSchema);
exports.default = TokenModel;
