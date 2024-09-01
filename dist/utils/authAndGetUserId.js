"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAndGetUserId = void 0;
const error_1 = require("./error");
/**
 * Checks if the request is authenticated and returns the user ID.
 * Throws an authentication error if the request is not authenticated.
 *
 * @param req The express request object with custom properties from the auth middleware.
 * @returns The authenticated user's ID.
 * @throws ApiError if the request is not authenticated.
 */
const authAndGetUserId = (req) => {
    if (!req?.isAuth || !req.userId) {
        // If not authenticated or if userId is not set, throw an error
        throw new error_1.ApiError('User is not authenticated', 401);
    }
    return req.userId;
};
exports.authAndGetUserId = authAndGetUserId;
