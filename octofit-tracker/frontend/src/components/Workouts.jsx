import { useEffect, useState } from 'react';
import { fetchApiData } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        const data = await fetchApiData('workouts/');
        const workoutList = Array.isArray(data) ? data : data.data || [];
        setWorkouts(workoutList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  const getDifficultyBadge = (difficulty) => {
    const colors = {
      beginner: 'success',
      intermediate: 'warning',
      advanced: 'danger',
    };
    return colors[difficulty] || 'secondary';
  };

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Personalized Workouts</h2>
      <div className="row">
        {workouts.length === 0 ? (
          <div className="col-12">
            <p>No workouts available</p>
          </div>
        ) : (
          workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title">{workout.name}</h5>
                    <span
                      className={`badge bg-${getDifficultyBadge(
                        workout.difficulty
                      )}`}
                    >
                      {workout.difficulty}
                    </span>
                  </div>
                  {workout.description && (
                    <p className="card-text">{workout.description}</p>
                  )}
                  {workout.exercises && workout.exercises.length > 0 && (
                    <div>
                      <h6>Exercises:</h6>
                      <ul className="small">
                        {workout.exercises.map((exercise, idx) => (
                          <li key={idx}>
                            <strong>{exercise.name}</strong>: {exercise.sets} sets ×{' '}
                            {exercise.reps} reps
                            {exercise.weight && ` @ ${exercise.weight}lbs`}
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
