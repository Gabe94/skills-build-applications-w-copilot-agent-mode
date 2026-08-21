import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const endpointPath = '/api/workouts/'

  useEffect(() => {
    let isMounted = true

    fetchCollection(endpointPath)
      .then((items) => {
        if (isMounted) {
          setWorkouts(items)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus('error')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-warning">Workouts are unavailable.</p>
  }

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Plans</p>
        <h1>Workouts</h1>
      </div>
      <div className="data-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id ?? workout.title}>
            <h2>{workout.title}</h2>
            <p>{workout.focus}</p>
            <span className="badge text-bg-dark">{workout.difficulty}</span>
            <p className="meta">{workout.estimatedMinutes} minutes</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts