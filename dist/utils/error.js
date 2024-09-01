"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    data;
    extensions;
    code;
    constructor(message, code, data = null, extensions = null) {
        super(message);
        this.name = 'ApiError';
        Object.setPrototypeOf(this, ApiError.prototype);
        this.data = data;
        this.extensions = extensions;
        this.code = code;
    }
}
exports.ApiError = ApiError;
