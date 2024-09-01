"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
// LOCAL
const env_1 = require("../consts/env");
exports.corsOptions = {
    origin: function (origin, callback) {
        const allowedPorts = env_1.ALLOWED_PORTS
            ? env_1.ALLOWED_PORTS.split(',').map((port) => port.trim())
            : [];
        if (!origin || allowedPorts.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
