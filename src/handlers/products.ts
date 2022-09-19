import { Request, Response, Application } from 'express'
import { ProductsStore } from '../models/product'
import auth from '../middleware/auth'

const products = new ProductsStore()

// Getting products list
const index = async (_req: Request, res: Response) => {
  try {
    const productsList = await products.index()
    res.json(productsList)
  } catch (error) {
    res.status(400).json(error)
  }
}

// Show product by ID
const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number
    if (!id) {
      res.status(404).json({ error: 'Not found' })
    }
    const product = await products.show(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json(error)
  }
}

// Create new product
const create = async (req: Request, res: Response) => {
  try {
    const product = await products.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json(error)
  }
}

const products_routes = (app: Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', auth, create)
}

export default products_routes
