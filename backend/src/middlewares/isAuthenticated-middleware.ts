import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '../utils/appErr-util';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
   if (!req.user || !req.user._id) {
      throw new UnauthorizedException('Unauthorized: User not authenticated');
   }
   next();
};

export default isAuthenticated;