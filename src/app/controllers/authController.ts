import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import RefreshToken from '../models/refreshToken';
import crypto from 'crypto';

const generateRefreshToken = (userId: string) => {
  const refreshToken = crypto.randomBytes(40).toString('hex');
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  const newRefreshToken = new RefreshToken({
    userId,
    token: refreshToken,
    expires,
  });

  return newRefreshToken.save();
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, lastName, email, phone, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    const existingPhone = await User.findOne({ phone });

    if (existingUser) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }
    if (existingPhone) {
      res.status(400).json({ message: 'Phone number already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, lastName, email, phone, role, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const expiresIn = process.env.EXPIRESIN || '1h';
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn });
    const refreshToken = await generateRefreshToken(user._id);

    res.json({ message: 'Login successful', token, refreshToken: refreshToken.token, expiresIn });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;
  try {
    await RefreshToken.findOneAndDelete({ token });
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Error logging out', error });
  }
};

export const getProfileInfo = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { user } = req.body;
  
  if (user.id !== userId) {
    res.status(403).json({ message: 'Access denied' });
    return;
  }

  try {
    const userProfile = await User.findById(userId).select('-password');
    if (!userProfile) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(userProfile);
  } catch (error) {
    console.error('Error getting profile info:', error);
    res.status(500).json({ message: 'Error getting profile info', error });
  }
};

