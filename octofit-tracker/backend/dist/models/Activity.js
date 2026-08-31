import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: { type: Number },
    calories: { type: Number },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
