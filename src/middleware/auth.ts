import jwt, { Secret } from 'jsonwebtoken'
import { Request, Response } from 'express'

const auth = (req: Request, res: Response, next: any) => {
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as Secret)
    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

export default auth
