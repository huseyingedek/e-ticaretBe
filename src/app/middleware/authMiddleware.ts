import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction):void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
     res.status(401).json({ message: 'No token, authorization denied' });
     return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.body.user = decoded;
    next();
  } catch (error) {
    console.error('Token is not valid:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};