import { Outlet, Link } from 'react-router-dom';
import { getApiBaseUrl } from './api';
import './App.css';

const octofitLogo = '/octofitapp-small.png';

function App() {
  const apiUrl = getApiBaseUrl();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={octofitLogo} alt="OctoFit logo" width="36" height="36" />
            <span>OctoFit Tracker</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="py-4">
        <div className="container-fluid">
          <div className="alert alert-info mb-4" role="alert">
            <strong>API Base URL:</strong> {apiUrl}
            <br />
            <small className="text-muted">
              Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for
              Codespaces support
            </small>
          </div>
          <Outlet />
        </div>
      </main>

      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">
            OctoFit Tracker | Multi-tier Application with React 19 + Express + MongoDB
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
