import client from '../database'
import Order from '../types/Order'

export class OrdersStore {
  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT * FROM orders'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not get orders. Error: ${error}`)
    }
  }

  async show(id: number): Promise<Order[]> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT * FROM orders WHERE id = ($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not find order ${id}, Error: ${error}`)
    }
  }

  async create(order: Order) {
    try {
      const connection = await client.connect()
      const sql =
        'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *'
      const result = await connection.query(sql, [order.status, order.user_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not create an order ${order}. Error: ${error}`)
    }
  }
}
