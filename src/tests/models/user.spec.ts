import { Users } from '../../models/user'

const users = new Users()

describe('User Model', () => {
  const testUser = {
    id: 1,
    firstName: 'Zeinab',
    lastName: 'Ramadan',
    password: '2',
  }

  it('should have an index method', () => {
    expect(users.index).toBeDefined()
  })

  it('should have a create method', () => {
    expect(users.create).toBeDefined()
  })
  it('should have a show method', () => {
    expect(users.show).toBeDefined()
  })

  it('create method should create a new user', async () => {
    const result = await users.create(testUser)
    expect(result).not.toBeNull()
  })

  it('show method should return a list of users', async () => {
    const result = await users.show(1)
    expect(result).not.toBeNull()
  })

  it('index method should return a list of users', async () => {
    const result = await users.index()
    expect(result).toHaveSize(2)
  })

  // afterAll(async () => {
  //   try {
  //     const connection = await client.connect()
  //     const sql = 'DROP TABLE users,orders,products,migrations;'
  //     connection.query(sql)
  //     connection.release()
  //   } catch (error) {
  //     throw new Error('Could not drop tables!')
  //   }
  // })
})
