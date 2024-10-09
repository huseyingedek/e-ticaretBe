import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Role from '../models/Role';

export const checkRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await User.findById(req.body.user.id).populate('role');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const userRole = await Role.findById(user.role);
      if (!userRole || !roles.includes(userRole.name)) {
        res.status(403).json({ message: 'Access denied' });
        return;
      }

      next();
    } catch (error) {
      console.error('Role check error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

export const checkPermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await User.findById(req.body.user.id).populate('role');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const userRole = await Role.findById(user.role);
      if (!userRole || !userRole.permissions.includes(permission)) {
        res.status(403).json({ message: 'Access denied' });
        return;
      }

      next();
    } catch (error) {
      console.error('Permission check error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};