import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;

}

const userSchema = new Schema<IUser>({
  name: { type: String, required:true},
  lastName: { type: String, required:true},
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);
export default User;