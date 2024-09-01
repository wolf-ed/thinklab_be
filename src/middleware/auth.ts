import { Request, Response, NextFunction } from 'express';

// LOCAL
import { TOKEN_SECRET } from '../consts/env';
import { ApiError } from '../utils/error';

import jwt from 'jsonwebtoken';

interface JWTPayload {
  userId?: string;
  role?: string;
}

export interface Request_Interface extends Request {
  isAuth?: boolean;
  userId?: string;
}

export const authMiddleware = (
  req: Request_Interface,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader ? authHeader?.split(' ')[1] : '';
  let decodedToken: JWTPayload | undefined;
  let userId: string | undefined;
  try {
    decodedToken = jwt.verify(token, TOKEN_SECRET) as JWTPayload;
    userId = decodedToken?.userId;
  } catch (error) {
    throw new ApiError('Not authenticated', 500);
  }
  if (!decodedToken || !userId) {
    req.isAuth = false;
    return next();
  }
  req.userId = userId;
  req.isAuth = true;
  next();
};
