import { Router } from 'express'
import { getApiBaseUrl } from '../config/apiUrl.js'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'
import { createCollectionRouter } from './createCollectionRouter.js'

export function createApiRouter(port: number) {
  const router = Router()
  const baseUrl = getApiBaseUrl(port)

  router.get('/health', (_request, response) => {
    response.json({ status: 'ok', baseUrl })
  })

  router.use('/users', createCollectionRouter('users', User))
  router.use('/teams', createCollectionRouter('teams', Team))
  router.use('/activities', createCollectionRouter('activities', Activity))
  router.use('/leaderboard', createCollectionRouter('leaderboard', Leaderboard))
  router.use('/workouts', createCollectionRouter('workouts', Workout))

  return router
}