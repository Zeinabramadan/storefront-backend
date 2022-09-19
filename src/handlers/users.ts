import { Request, Response, Application } from 'express'
import { Users } from '../models/user'
import jwt from 'jsonwebtoken'
import auth from '../middleware/auth'

const UsersInstance = new Users()

// Getting users list
const index = async (_req: Request, res: Response) => {
  try {
    const usersList = await UsersInstance.index()
    res.json(usersList)
  } catch (error) {
    res.status(400).json(error)
  }
}

// Show user by ID
const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number
    const user = await UsersInstance.show(id)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}

// Create new user
const create = async (req: Request, res: Response) => {
  try {
    const user = await UsersInstance.create(req.body)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'This name already exists!' })
  }
}

const sign_in = async (req: Request, res: Response) => {
  try {
    const firstName = req.body.firstName
    const password = req.body.password
    const newUser = await UsersInstance.sign_in(firstName, password)
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    )
    res.status(200).json({ token: token })
  } catch (error) {
    res.status(400).json(error)
  }
}

const users_routes = (app: Application) => {
  app.get('/users', auth, index)
  app.get('/users/:id', auth, show)
  app.post('/users', create)
  app.post('/sign-in', sign_in)
}

export default users_routes
