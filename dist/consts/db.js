"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = void 0;
const env_1 = require("./env");
exports.MONGODB_URI = `${env_1.MONGO_URL_FIRST}${env_1.MONGO_DB_PASS}${env_1.MONGO_URL_SECOND}${env_1.MONGO_DATABASE}${env_1.MONGO_URL_THIRD}`;
