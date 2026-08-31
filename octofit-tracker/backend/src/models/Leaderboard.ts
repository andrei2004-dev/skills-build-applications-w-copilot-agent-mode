import mongoose, { Schema, Document } from 'mongoose';

interface ILeaderboard extends Document {
  user: mongoose.Types.ObjectId;
  score: number;
  totalActivities: number;
  totalDistance?: number;
  totalCalories?: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    score: { type: Number, default: 0 },
    totalActivities: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
    totalCalories: { type: Number, default: 0 },
    rank: { type: Number },
  },
  { timestamps: true }
);

const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);

export default Leaderboard;
