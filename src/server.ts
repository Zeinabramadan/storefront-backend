import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'

import { PORT } from './utils/constants'

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

app.get('*', (_req: Request, res: Response) => {
  res.status(404).send('Source not found')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default app
