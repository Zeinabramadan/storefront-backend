import { Request, Response, Application } from 'express'
import { OrdersStore } from '../models/order'
import auth from '../middleware/auth'

const orders = new OrdersStore()

// Getting orders list
const index = async (_req: Request, res: Response) => {
  try {
    const ordersList = await orders.index()
    res.json(ordersList)
  } catch (error) {
    res.status(400).json(error)
  }
}

// Show order by ID
const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number
    if (!id) {
      res.status(404).json({ error: 'Not found' })
    }
    const order = await orders.show(id)
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json(error)
  }
}

// Create new order
const create = async (req: Request, res: Response) => {
  try {
    const order = await orders.create(req.body)
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json(error)
  }
}

const addProduct = async (req: Request, res: Response) => {
  const orderID = req.params.id as unknown as number
  const quantity = req.body.quantity as unknown as number
  const productID = req.body.product_id as unknown as number
  try {
    const order = await orders.addProduct(quantity, orderID, productID)
    res.status(200).json(order)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

const orders_routes = (app: Application) => {
  app.get('/orders', auth, index)
  app.get('/orders/:id', auth, show)
  app.post('/orders', auth, create)
  app.post('/orders/:id/products', auth, addProduct)
}

export default orders_routes
