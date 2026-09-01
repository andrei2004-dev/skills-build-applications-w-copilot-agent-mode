import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  password?: string;
  avatar?: string;
  team?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String },
    avatar: { type: String },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
