import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    score: { type: Number, default: 0 },
    totalActivities: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
    totalCalories: { type: Number, default: 0 },
    rank: { type: Number },
}, { timestamps: true });
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
export default Leaderboard;
