import dotenv from 'dotenv'

dotenv.config()

const PORT: unknown = process.env.PORT || 3000

export { PORT }
