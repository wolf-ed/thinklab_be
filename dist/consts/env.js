"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_PORTS = exports.MONGO_DB_PASS = exports.MONGO_DATABASE = exports.MONGO_URL_THIRD = exports.MONGO_URL_SECOND = exports.MONGO_URL_FIRST = exports.PORT = exports.TOKEN_SECRET = void 0;
require('dotenv').config();
// secret
exports.TOKEN_SECRET = process.env.TOKEN_SECRET;
// port
exports.PORT = process.env.PORT;
// mongo
exports.MONGO_URL_FIRST = process.env.MONGO_URL_FIRST;
exports.MONGO_URL_SECOND = process.env.MONGO_URL_SECOND;
exports.MONGO_URL_THIRD = process.env.MONGO_URL_THIRD;
exports.MONGO_DATABASE = process.env.MONGO_DATABASE;
exports.MONGO_DB_PASS = process.env.MONGO_DB_PASS;
exports.ALLOWED_PORTS = process.env.ALLOWED_PORTS;
