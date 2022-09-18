import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  ENV,
  POSTGRES_DB_TESTING,
  POSTGRES_USER_TESTING,
} = process.env

let client: any

console.log('DB: ' + ENV)

if (ENV === 'dev') {
  console.log('ENV: ' + ENV)
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
  })
} else {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TESTING,
    user: POSTGRES_USER_TESTING,
  })
}

export default client
