import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let isMounted = true

    fetchCollection('leaderboard')
      .then((items) => {
        if (isMounted) {
          setLeaders(items)
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
    return <p className="text-muted">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-warning">Leaderboard is unavailable.</p>
  }

  return (
    <section className="data-panel leaderboard">
      <div className="section-heading">
        <p className="eyebrow">Standings</p>
        <h1>Leaderboard</h1>
      </div>
      <div className="rank-list">
        {leaders.map((leader) => (
          <article className="rank-row" key={leader._id}>
            <strong>#{leader.rank}</strong>
            <span>{leader.points} pts</span>
            <span className="meta">{leader.period}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard