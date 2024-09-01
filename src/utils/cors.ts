import { CorsOptions } from 'cors';

// LOCAL
import { ALLOWED_PORTS } from '../consts/env';

export const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    const allowedPorts = ALLOWED_PORTS
      ? ALLOWED_PORTS.split(',').map((port) => port.trim())
      : [];

    if (!origin || allowedPorts.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
