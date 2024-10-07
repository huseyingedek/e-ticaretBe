import mongoose, { Document, Schema } from 'mongoose';

interface IRefreshToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expires: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  expires: { type: Date, required: true },
}, { timestamps: true });

const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);
export default RefreshToken;