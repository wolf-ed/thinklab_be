import { Request_Interface } from '../middleware/auth';
import { ApiError } from './error';

/**
 * Checks if the request is authenticated and returns the user ID.
 * Throws an authentication error if the request is not authenticated.
 *
 * @param req The express request object with custom properties from the auth middleware.
 * @returns The authenticated user's ID.
 * @throws ApiError if the request is not authenticated.
 */
export const authAndGetUserId = (req: Request_Interface): string => {
  if (!req?.isAuth || !req.userId) {
    // If not authenticated or if userId is not set, throw an error
    throw new ApiError('User is not authenticated', 401);
  }
  return req.userId;
};
