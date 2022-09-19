import client from '../database'
import Product from '../types/Product'

export class ProductsStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT * FROM products'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not get products. Error: ${error}`)
    }
  }

  async show(id: number): Promise<Product[]> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT * FROM products WHERE id = ($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not find product ${id}, Error: ${error}`)
    }
  }

  async create(product: Product) {
    try {
      const connection = await client.connect()
      const sql =
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not create new product ${product.name}. Error: ${error}`
      )
    }
  }
}
