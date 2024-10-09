import { Request, Response } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

export const listUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error('Error listing users:', error);
        res.status(500).json({ message: 'Error listing users', error });
    }

};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const { userId } = req.params;

        if (!mongoose.isValidObjectId(userId)) {
            res.status(400).json({ message: 'Geçersiz kullanıcı ID\'si' });
            return;
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(deletedUser);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
