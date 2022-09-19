import client from '../database'

export class DashboardQueries {
  // Get all products by category
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
}
