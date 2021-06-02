"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestPasswordReset = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var crypto_1 = __importDefault(require("crypto"));
var userModel_1 = require("../models/userModel");
var token_model_1 = __importDefault(require("../models/token.model"));
var sendEmail_1 = __importDefault(require("../utils/mail/sendEmail"));
var requestPasswordReset = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, newToken, tokenHash, link;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userModel_1.UserModel.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new Error("User with this email does not exist");
                return [4 /*yield*/, token_model_1.default.findOne({ userId: user._id })];
            case 2:
                token = _a.sent();
                if (!token) return [3 /*break*/, 4];
                return [4 /*yield*/, token_model_1.default.deleteOne()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                newToken = crypto_1.default.randomBytes(32).toString("hex");
                return [4 /*yield*/, bcryptjs_1.default.hash(newToken, Number(process.env.BCRYPT_SALT))];
            case 5:
                tokenHash = _a.sent();
                // save the new token
                return [4 /*yield*/, new token_model_1.default({
                        userId: user._id,
                        token: tokenHash,
                        createdAt: Date.now(),
                    }).save()];
            case 6:
                // save the new token
                _a.sent();
                link = process.env.CLIENT_URL + "/resetPassword?token=" + newToken + "&id=" + user._id;
                sendEmail_1.default(user.email, "Password Reset", { name: user.firstName, newToken: newToken }, "requestMail.hbs");
                return [2 /*return*/, { link: link }];
        }
    });
}); };
exports.requestPasswordReset = requestPasswordReset;
var resetPassword = function (id, password, token) { return __awaiter(void 0, void 0, void 0, function () {
    var userToken, validateToken, newPassword, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, token_model_1.default.findOne({ userId: id })];
            case 1:
                userToken = _a.sent();
                return [4 /*yield*/, bcryptjs_1.default.compare(token, userToken.token)];
            case 2:
                validateToken = _a.sent();
                if (!userToken || !validateToken)
                    throw new Error("Invalid or expired token");
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 3:
                newPassword = _a.sent();
                return [4 /*yield*/, userModel_1.UserModel.findByIdAndUpdate(id, {
                        $set: {
                            password: newPassword,
                        },
                    }, { new: true })];
            case 4:
                _a.sent();
                return [4 /*yield*/, userModel_1.UserModel.findOne({ _id: id })];
            case 5:
                user = _a.sent();
                sendEmail_1.default(user.email, "Password Reset Successfully", { name: user.firstName }, "resetSuccessMail.hbs");
                // Deleted created token once password has been reset
                return [4 /*yield*/, userToken.deleteOne()];
            case 6:
                // Deleted created token once password has been reset
                _a.sent();
                return [2 /*return*/, "Password has been reset successfully"];
        }
    });
}); };
exports.resetPassword = resetPassword;
