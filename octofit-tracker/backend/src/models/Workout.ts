import mongoose, { Schema, Document } from 'mongoose';

interface IWorkout extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    weight?: number;
  }>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        weight: { type: Number },
      },
    ],
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  },
  { timestamps: true }
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
