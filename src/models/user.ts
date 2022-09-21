import client from '../database'
import bcrypt from 'bcrypt'

import User from '../types/User'

const { SALT_ROUNDS, PEPPER } = process.env

export class Users {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT * FROM users'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not get users. Error: ${error}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT * FROM users WHERE id = ($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not find user ${id}, Error: ${error}`)
    }
  }

  async create(user: User) {
    try {
      const connection = await client.connect()
      const sql =
        'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *'
      const hash = bcrypt.hashSync(
        user.password + PEPPER,
        parseInt(SALT_ROUNDS as unknown as string)
      )
      const result = await connection.query(sql, [
        user.firstName,
        user.lastName,
        hash,
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not add new user ${user.firstName}. Error: ${error}`
      )
    }
  }

  async sign_in(firstName: string, password: string): Promise<User | null> {
    const connection = await client.connect()
    const sql = 'SELECT * FROM users WHERE firstName=($1)'
    const result = await connection.query(sql, [firstName])

    if (result.rows.length) {
      const user = result.rows[0]
      if (bcrypt.compareSync(password + PEPPER, user.password)) {
        return user
      }
    }
    return null
  }
}
