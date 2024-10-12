import { Request, Response } from 'express';
import User from '../models/User';
import Role from '../models/Role';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const addUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, lastName, email, password, phone, role } = req.body;

        const existingEmail = await User.findOne({ email });
        const existingPhone = await User.findOne({ phone });
        if (existingEmail) {
            res.status(400).json({ message: 'A user with this email already exists' });
            return;
        }
        if (existingPhone) {
            res.status(400).json({ message: 'A user with this phone number already exists' });
            return;
        }

        let roleId;
        if (role) {
            if (mongoose.Types.ObjectId.isValid(role)) {
                const roleDoc = await Role.findById(role);
                if (roleDoc) {
                    roleId = roleDoc._id;
                } else {
                    res.status(400).json({ message: 'Invalid role ID' });
                    return;
                }
            } else {
                const roleDoc = await Role.findOne({ name: role });
                if (roleDoc) {
                    roleId = roleDoc._id;
                } else {
                    res.status(400).json({ message: 'Invalid role name' });
                    return;
                }
            }
        } else {
            roleId = await Role.findOne({ name: 'user' }).then(role => role?._id);
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, lastName, email, password: hashedPassword, phone, role: roleId });
        await newUser.save();

        res.json(newUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user', error });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const { name, lastName, email, password, phone, role } = req.body;

        if (!mongoose.isValidObjectId(userId)) {
            res.status(400).json({ message: 'Invalid user ID' });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const existingEmail = await User.findOne({ email });
        const existingPhone = await User.findOne({ phone });
        if (existingEmail && existingEmail._id.toString() !== userId) {
            res.status(400).json({ message: 'A user with this email already exists' });
            return;
        }
        if (existingPhone && existingPhone._id.toString() !== userId) {
            res.status(400).json({ message: 'A user with this phone number already exists' });
            return;
        }

        let roleId;
        if (role) {
            if (mongoose.Types.ObjectId.isValid(role)) {
                const roleDoc = await Role.findById(role);
                if (roleDoc) {
                    roleId = roleDoc._id;
                } else {
                    res.status(400).json({ message: 'Invalid role ID' });
                    return;
                }
            } else {
                const roleDoc = await Role.findOne({ name: role });
                if (roleDoc) {
                    roleId = roleDoc._id;
                } else {
                    res.status(400).json({ message: 'Invalid role name' });
                    return;
                }
            }
        } else {
            roleId = await Role.findOne({ name: 'user' }).then(role => role?._id);
        }

        if (name) user.name = name;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (phone) user.phone = phone;
        if (role) user.role = roleId as mongoose.Types.ObjectId;

        await user.save();

        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error });
    }
};

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
