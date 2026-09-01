import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String },
    avatar: { type: String },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
export default User;
