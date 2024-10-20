import { Request, Response } from 'express';
import User from '../models/User';

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

export const updateProfileInfo = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { user } = req.body;
  const { name, lastName, email, phone } = req.body;

  if (user.id !== userId) {
    res.status(403).json({ message: 'Access denied' });
    return;
  }

  try {
    const existingPhoneUser = await User.findOne({ phone });
    if (existingPhoneUser && existingPhoneUser._id.toString() !== userId) {
      res.status(400).json({ message: 'Bu telefon numarası zaten kullanılıyor.' });
      return;
    }

    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser && existingEmailUser._id.toString() !== userId) {
      res.status(400).json({ message: 'Bu email adresi zaten kullanılıyor.' });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, lastName, email, phone },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile info:', error);
    res.status(500).json({ message: 'Error updating profile info', error });
  }
};

