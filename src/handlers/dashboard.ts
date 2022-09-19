import { Application, Request, Response } from 'express'

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

const dashboard_routes = (app: Application) => {
  app.get('/products/:category', byCategory)
}

export default dashboard_routes
