import { useEffect, useState } from 'react';
import { fetchApiData } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchApiData('users/');
        // Handle both array and paginated response formats
        const userList = Array.isArray(data) ? data : data.data || [];
        setUsers(userList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div className="alert alert-info">Loading users...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <div className="row">
        {users.length === 0 ? (
          <div className="col-12">
            <p>No users found</p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user._id} className="col-md-4 mb-3">
              <div className="card">
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{user.fullName}</h5>
                  <p className="card-text">
                    <strong>Username:</strong> @{user.username}
                  </p>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
