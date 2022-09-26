import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

let token: string

describe('Dashboard Handler', () => {
  beforeAll(async () => {
    const user = await request
      .post('/users/sign_in')
      .send({ firstName: 'Zeinab', password: 'pass123' })
    token = user.body
  })

  it('Gets products by category', async () => {
    const response = await request.get('/products/Fruits')
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body).toEqual(jasmine.any(Array))
  })

  it('Gets category does not exist', async () => {
    const response = await request.get('/products/test')
    expect(response.status).toBe(200)
    expect(response.body).toEqual('No category with that name!')
  })
  it('Gets user orders', async () => {
    const response = await request
      .get(`/users/${1}/orders`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(jasmine.any(Object))
  })
  it('Should return list of products', async () => {
    const response = await request
      .get('/products_in_orders')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body).toEqual(jasmine.any(Array))
  })
})
