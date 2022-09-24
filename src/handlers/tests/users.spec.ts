import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)
let token: string = ''

describe('Users Handler', () => {
  const testUser = {
    id: 1,
    firstName: 'Zeinab',
    lastName: 'Ramadan',
    password: 'pass123',
  }

  it('Should create user', async () => {
    const response = await request.post('/users').send(testUser)
    token = response.body
    console.log(token)
    expect(response.status).toBe(200)
  })

  it('Should return Unauthorized', async () => {
    const response = await request.get('/users')
    expect(response.status).toBe(401)
  })

  it('Should get list of users', async () => {
    const response = await request.get('/users').auth(token, { type: 'bearer' })
    expect(response.status).toBe(200)
    console.log(response.body)
    expect(response.body.length).toBe(1)
  })

  it('Should show a specific user', async () => {
    const response = await request
      .get(`/users/${testUser.id}`)
      .auth(token, { type: 'bearer' })
    expect(response.status).toBe(200)
  })
})

// export token
