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
  POSTGRES_PASSWORD_TESTING,
  POSTGRES_PASSWORD,
} = process.env

let client: any

console.log('DB: ' + ENV)

if (ENV === 'dev') {
  console.log('ENV: ' + ENV)
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
} else {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TESTING,
    user: POSTGRES_USER_TESTING,
    password: POSTGRES_PASSWORD_TESTING,
  })
}

export default client
