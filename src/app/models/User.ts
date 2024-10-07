import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: 'user' | 'admin';
}

const userSchema = new Schema<IUser>({
  name: { type: String, required:true},
  lastName: { type: String, required:true},
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String,  enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);
export default User;