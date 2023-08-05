import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (apiKey !== '4V3gGCOUdOv+Nq9oNRDdBCozbwIekiD4fh5UofWHTf8=') {
      return res.status(401).json({ message: 'Unauthorized. Invalid API Key.' });
    }

    return next();
  }
}
