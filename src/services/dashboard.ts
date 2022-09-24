import client from '../database'

export class DashboardQueries {
  // Get products by category
  async productsByCategory(category: string) {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE category in ($1)'

      const result = await conn.query(sql, [category])
      if (!result.rows.length) {
        return 'No category with that name!'
      }
      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products: ${err}`)
    }
  }

  // Getting products have been orders
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string; category: string }[]
  > {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT * FROM products INNER JOIN orders_products ON products.id = orders_products.product_id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(`Could not get products and orders: ${error}`)
    }
  }

  // Get all orders for a user
  async userOrders(id: number) {
    try {
      //@ts-ignore
      const conn = await client.connect()
      const sql =
        'SELECT firstName, lastName, user_id, status FROM users INNER JOIN orders ON users.id = orders.user_id WHERE users.id = ($1)'

      const result = await conn.query(sql, [id])
      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get orders: ${err}`)
    }
  }
}
