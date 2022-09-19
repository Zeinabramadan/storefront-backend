import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'

import { PORT } from './utils/constants'
import users_routes from './handlers/users'
import products_routes from './handlers/products'
import dashboard_routes from './handlers/dashboard'

const CORS_OPTIONS = {
  origin: 'http://test.com',
  optionsSuccessStatus: 200,
}

const app: Application = express()

// 3rd party libs
app.use(cors(CORS_OPTIONS))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('store front app')
})

// ENDPOINTS
users_routes(app)
dashboard_routes(app)
products_routes(app)

app.get('*', (_req: Request, res: Response) => {
  res.status(404).send('Source not found')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default app
