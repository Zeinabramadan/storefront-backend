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
    expect(response.status).toBe(200)
  })

  it('Should sign in user', async () => {
    const response = await request
      .post('/users/sign_in')
      .send({ firstName: 'Zeinab', password: 'pass123' })
    token = response.body
    expect(response.status).toBe(200)
  })

  it('Should return Unauthorized', async () => {
    const response = await request.get('/users')
    expect(response.status).toBe(401)
  })

  it('Should get list of users', async () => {
    const response = await request.get('/users').auth(token, { type: 'bearer' })
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body).toEqual(jasmine.any(Array))
  })

  it('Should show a specific user', async () => {
    const response = await request
      .get(`/users/${testUser.id}`)
      .auth(token, { type: 'bearer' })
    expect(response.status).toBe(200)
    expect(response.body).toEqual(jasmine.any(Object))
    expect(response.body.id).toBe(testUser.id)
  })
})

export { token }
