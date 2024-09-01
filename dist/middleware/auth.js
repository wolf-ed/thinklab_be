"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
// LOCAL
const env_1 = require("../consts/env");
const error_1 = require("../utils/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader ? authHeader?.split(' ')[1] : '';
    let decodedToken;
    let userId;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, env_1.TOKEN_SECRET);
        userId = decodedToken?.userId;
    }
    catch (error) {
        throw new error_1.ApiError('Not authenticated', 500);
    }
    if (!decodedToken || !userId) {
        req.isAuth = false;
        return next();
    }
    req.userId = userId;
    req.isAuth = true;
    next();
};
exports.authMiddleware = authMiddleware;
