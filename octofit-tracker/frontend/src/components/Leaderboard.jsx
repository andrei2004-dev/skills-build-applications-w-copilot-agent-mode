import { useEffect, useState } from 'react';
import { fetchApiData } from '../api';

// Codespaces API endpoint: https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await fetchApiData('leaderboard/');
        const leaderboardData = Array.isArray(data) ? data : data.data || [];
        setLeaderboard(leaderboardData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Competitive Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Score</th>
              <th>Activities</th>
              <th>Distance (km)</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No leaderboard data available
                </td>
              </tr>
            ) : (
              leaderboard.map((entry, index) => (
                <tr key={entry._id} className={index === 0 ? 'table-warning' : ''}>
                  <td>
                    <strong>{entry.rank || index + 1}</strong>
                  </td>
                  <td>{entry.user?.fullName || entry.user?.username || 'Unknown'}</td>
                  <td>
                    <strong>{entry.score}</strong>
                  </td>
                  <td>{entry.totalActivities}</td>
                  <td>{entry.totalDistance || 0}</td>
                  <td>{entry.totalCalories || 0}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
