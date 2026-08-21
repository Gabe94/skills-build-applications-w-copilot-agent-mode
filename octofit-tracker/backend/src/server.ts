import express from 'express'
import { connectDatabase } from './config/database.js'
import { createApiRouter } from './routes/index.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(express.json())
app.use('/api', createApiRouter(port))

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
})

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit backend listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to octofit_db:', error)
    process.exit(1)
  })