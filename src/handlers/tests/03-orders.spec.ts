import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

let token: string

describe('Orders Handler', () => {
  const testOrder = {
    id: 1,
    status: 'Active',
    user_id: 1,
  }

  beforeAll(async () => {
    const user = await request
      .post('/users/sign_in')
      .send({ firstName: 'Zeinab', password: 'pass123' })
    token = user.body
  })

  it('Should create a new order', async () => {
    const response = await request
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(testOrder)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(jasmine.any(Object))
    expect(response.body.status).toBe(testOrder.status)
  })
  it('Should return 401 unauthorized', async () => {
    const response = await request.post('/orders').send(testOrder)
    expect(response.status).toBe(401)
  })
  it('Should return list of orders', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body).toEqual(jasmine.any(Array))
  })

  it('Should create a new order', async () => {
    const product = { quantity: 2, product_id: 1, order_id: 1 }

    const response = await request
      .post(`/orders/${1}/products `)
      .set('Authorization', `Bearer ${token}`)
      .send(product)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(jasmine.any(Object))
  })
})
