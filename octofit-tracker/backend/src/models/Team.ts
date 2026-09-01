import mongoose, { Schema, Document } from 'mongoose';

interface ITeam extends Document {
  name: string;
  description?: string;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Team = mongoose.model<ITeam>('Team', teamSchema);

export default Team;
