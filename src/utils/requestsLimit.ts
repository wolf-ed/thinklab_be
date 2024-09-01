import rateLimit from 'express-rate-limit';

export const requestsLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // ammount of time limit
  max: 100, //limit per ammount of time
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
