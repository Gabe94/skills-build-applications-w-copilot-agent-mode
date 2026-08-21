import { Router } from 'express'
import type { Model } from 'mongoose'

export function createCollectionRouter(resource: string, model: Model<unknown>) {
  const router = Router()

  router.get('/', async (_request, response, next) => {
    try {
      const items = await model.find().lean()

      response.json({ resource, items })
    } catch (error) {
      next(error)
    }
  })

  return router
}