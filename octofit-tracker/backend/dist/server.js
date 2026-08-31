import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';
import Team from './models/Team.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Workout from './models/Workout.js';
const app = express();
const port = 8000;
// Codespaces-aware API URL support
const getApiUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return `http://localhost:${port}`;
};
app.use(express.json());
// Middleware to expose API URL
app.use((_req, res, next) => {
    res.locals.apiUrl = getApiUrl();
    next();
});
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
mongoose
    .connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
// Health check endpoint
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiUrl: getApiUrl() });
});
// Users endpoints
app.get('/api/users/', async (_req, res) => {
    try {
        const users = await User.find().populate('team');
        res.json({ data: users, count: users.length });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
app.post('/api/users/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});
// Teams endpoints
app.get('/api/teams/', async (_req, res) => {
    try {
        const teams = await Team.find().populate('members');
        res.json({ data: teams, count: teams.length });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
app.post('/api/teams/', async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        await newTeam.save();
        res.status(201).json(newTeam);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
// Activities endpoints
app.get('/api/activities/', async (_req, res) => {
    try {
        const activities = await Activity.find().populate('user');
        res.json({ data: activities, count: activities.length });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
app.post('/api/activities/', async (req, res) => {
    try {
        const newActivity = new Activity(req.body);
        await newActivity.save();
        res.status(201).json(newActivity);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create activity' });
    }
});
// Leaderboard endpoints
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard.find()
            .populate('user')
            .sort({ rank: 1 });
        res.json({ data: leaderboard, count: leaderboard.length });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// Workouts endpoints
app.get('/api/workouts/', async (_req, res) => {
    try {
        const workouts = await Workout.find().populate('user');
        res.json({ data: workouts, count: workouts.length });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening on port ${port}`);
    console.log(`API URL: ${getApiUrl()}`);
});
