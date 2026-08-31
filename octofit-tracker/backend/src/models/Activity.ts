import mongoose, { Schema, Document } from 'mongoose';

interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  calories?: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    calories: { type: Number },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
