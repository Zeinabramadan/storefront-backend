import { Application, Request, Response } from 'express'
import auth from '../middleware/auth'

import { DashboardQueries } from '../services/dashboard'

const dashboard = new DashboardQueries()

// PRODUCTS
const byCategory = async (req: Request, res: Response) => {
  try {
    const category = req.params.category as unknown as string

    const products = await dashboard.productsByCategory(category)
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

// ORDERS
const userOrders = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.id as unknown as number
    const orders = await dashboard.userOrders(user_id)

    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

const dashboard_routes = (app: Application) => {
  app.get('/products/:category', byCategory)
  app.get('/users/:id/orders', auth, userOrders)
}

export default dashboard_routes
