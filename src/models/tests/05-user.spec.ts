import { Users } from '../user'

const users = new Users()

describe('User Model', () => {
  const testUser = {
    id: 2,
    firstName: 'Zeinab',
    lastName: 'Ramadan',
    password: 'pass2',
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
    expect(result).toBeTruthy()
  })

  it('show method should return a specific user', async () => {
    const result = await users.show(2)
    expect(result).toBeTruthy()
  })

  it('index method should return a list of users', async () => {
    const result = await users.index()
    expect(result).toHaveSize(2)
  })
})
