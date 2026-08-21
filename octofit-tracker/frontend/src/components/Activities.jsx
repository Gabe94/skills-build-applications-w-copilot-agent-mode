import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const endpointPath = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    fetchCollection(endpointPath)
      .then((items) => {
        if (isMounted) {
          setActivities(items)
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
    return <p className="text-muted">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-warning">Activities are unavailable.</p>
  }

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Logs</p>
        <h1>Activities</h1>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Type</th>
              <th>Minutes</th>
              <th>Calories</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.caloriesBurned}</td>
                <td>{new Date(activity.completedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities