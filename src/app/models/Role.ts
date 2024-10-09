import mongoose, { Document, Schema } from 'mongoose';

interface IRole extends Document {
  name: string;
  permissions: string[];
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  permissions: { type: [String], required: true }
});

const Role = mongoose.model<IRole>('Role', roleSchema);
export default Role;