import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seeding the octofit_db database with test data...');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    // Create sample users
    const users = await User.create([
      {
        username: 'alex_runner',
        email: 'alex@example.com',
        fullName: 'Alex Johnson',
        avatar: 'https://api.example.com/avatars/alex.jpg',
      },
      {
        username: 'jordan_cyclist',
        email: 'jordan@example.com',
        fullName: 'Jordan Smith',
        avatar: 'https://api.example.com/avatars/jordan.jpg',
      },
      {
        username: 'casey_swimmer',
        email: 'casey@example.com',
        fullName: 'Casey Williams',
        avatar: 'https://api.example.com/avatars/casey.jpg',
      },
      {
        username: 'morgan_crossfit',
        email: 'morgan@example.com',
        fullName: 'Morgan Brown',
        avatar: 'https://api.example.com/avatars/morgan.jpg',
      },
    ]);

    console.log(`✓ Created ${users.length} users`);

    // Create sample teams
    const teams = await Team.create([
      {
        name: 'Runners United',
        description: 'A team dedicated to running and distance activities',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Fitness Achievers',
        description: 'Team focused on overall fitness and health',
        members: [users[2]._id, users[3]._id],
      },
    ]);

    console.log(`✓ Created ${teams.length} teams`);

    // Create sample activities
    const activities = await Activity.create([
      {
        user: users[0]._id,
        type: 'Running',
        duration: 45,
        distance: 7.5,
        calories: 620,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[0]._id,
        type: 'Running',
        duration: 60,
        distance: 10.2,
        calories: 850,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        duration: 90,
        distance: 35,
        calories: 1200,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[2]._id,
        type: 'Swimming',
        duration: 40,
        distance: 2,
        calories: 450,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[3]._id,
        type: 'CrossFit',
        duration: 50,
        distance: 0,
        calories: 500,
        date: new Date(),
      },
    ]);

    console.log(`✓ Created ${activities.length} activities`);

    // Create sample leaderboard entries
    const leaderboard = await Leaderboard.create([
      {
        user: users[0]._id,
        score: 1470,
        totalActivities: 2,
        totalDistance: 17.7,
        totalCalories: 1470,
        rank: 1,
      },
      {
        user: users[1]._id,
        score: 1200,
        totalActivities: 1,
        totalDistance: 35,
        totalCalories: 1200,
        rank: 2,
      },
      {
        user: users[3]._id,
        score: 500,
        totalActivities: 1,
        totalDistance: 0,
        totalCalories: 500,
        rank: 3,
      },
      {
        user: users[2]._id,
        score: 450,
        totalActivities: 1,
        totalDistance: 2,
        totalCalories: 450,
        rank: 4,
      },
    ]);

    console.log(`✓ Created ${leaderboard.length} leaderboard entries`);

    // Create sample workouts
    const workouts = await Workout.create([
      {
        user: users[0]._id,
        name: 'Morning Run Training',
        description: 'A structured running workout for endurance',
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: 5, weight: 0 },
          { name: 'Main run', sets: 1, reps: 45, weight: 0 },
          { name: 'Cool-down walk', sets: 1, reps: 10, weight: 0 },
        ],
        difficulty: 'intermediate',
      },
      {
        user: users[3]._id,
        name: 'Full Body CrossFit',
        description: 'Complete body workout combining strength and cardio',
        exercises: [
          { name: 'Squats', sets: 5, reps: 8, weight: 95 },
          { name: 'Deadlifts', sets: 3, reps: 5, weight: 185 },
          { name: 'Push-ups', sets: 4, reps: 15, weight: 0 },
          { name: 'Burpees', sets: 3, reps: 20, weight: 0 },
        ],
        difficulty: 'advanced',
      },
      {
        user: users[2]._id,
        name: 'Beginner Swimming',
        description: 'A beginner-friendly swimming routine',
        exercises: [
          { name: 'Freestyle laps', sets: 10, reps: 1, weight: 0 },
          { name: 'Backstroke laps', sets: 5, reps: 1, weight: 0 },
          { name: 'Cool-down float', sets: 1, reps: 5, weight: 0 },
        ],
        difficulty: 'beginner',
      },
    ]);

    console.log(`✓ Created ${workouts.length} workouts`);

    console.log('\n✅ Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
