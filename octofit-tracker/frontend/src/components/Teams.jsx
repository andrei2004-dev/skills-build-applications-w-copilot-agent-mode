import { useEffect, useState } from 'react';
import { fetchApiData } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const data = await fetchApiData('teams/');
        const teamList = Array.isArray(data) ? data : data.data || [];
        setTeams(teamList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <div className="row">
        {teams.length === 0 ? (
          <div className="col-12">
            <p>No teams found</p>
          </div>
        ) : (
          teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <p className="card-text">
                    <strong>Members:</strong> {team.members?.length || 0}
                  </p>
                  {team.members && team.members.length > 0 && (
                    <div>
                      <small className="text-muted">Team members:</small>
                      <ul className="small">
                        {team.members.map((member) => (
                          <li key={member._id}>
                            {member.fullName || member.username}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
