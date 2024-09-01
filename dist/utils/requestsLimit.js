"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsLimit = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.requestsLimit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // ammount of time limit
    max: 100, //limit per ammount of time
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
