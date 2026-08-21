import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    fetchCollection('users')
      .then((items) => {
        if (isMounted) {
          setUsers(items)
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
    return <p className="text-muted">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-warning">Users are unavailable.</p>
  }

  return (
    <section className="data-panel">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h1>Users</h1>
      </div>
      <div className="data-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id ?? user.username}>
            <h2>{user.displayName ?? user.username}</h2>
            <p>{user.email}</p>
            <span className="badge text-bg-success">{user.fitnessLevel}</span>
            <p className="meta">{(user.favoriteActivities ?? []).join(', ')}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users