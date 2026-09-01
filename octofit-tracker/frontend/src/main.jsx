import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Users from './components/Users.jsx';
import Teams from './components/Teams.jsx';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Workouts from './components/Workouts.jsx';

function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to OctoFit Tracker</h1>
      <p className="lead">
        A multi-tier application for activity logging, team management, and fitness
        tracking
      </p>
      <div className="row mt-5">
        <div className="col-md-4">
          <h5>Users 👥</h5>
          <p>Manage user profiles and personal information</p>
        </div>
        <div className="col-md-4">
          <h5>Teams 👫</h5>
          <p>Create and manage teams for group activities</p>
        </div>
        <div className="col-md-4">
          <h5>Activities 🏃</h5>
          <p>Log and track your workouts and activities</p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <h5>Leaderboard 🏆</h5>
          <p>Compete with other users and track rankings</p>
        </div>
        <div className="col-md-4">
          <h5>Workouts 💪</h5>
          <p>Get personalized workout recommendations</p>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
