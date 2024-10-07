import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import RefreshToken from '../models/refreshToken';
import User from '../models/User';

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;
  try {
    const existingToken = await RefreshToken.findOne({ token });

    if (!existingToken || existingToken.expires < new Date()) {
      res.status(401).json({ message: 'Invalid or expired refresh token' });
      return;
    }

    const user = await User.findById(existingToken.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token: newAccessToken});

  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ message: 'Error refreshing token', error });
  }
};