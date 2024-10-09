import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true }
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);
export default User;