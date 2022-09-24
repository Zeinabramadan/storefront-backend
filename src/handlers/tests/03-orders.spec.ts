import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

import { token } from './01-users.spec'

describe('Orders Handler', () => {
  const testOrder = {
    id: 1,
    status: 'Active',
    user_id: 1,
  }

  it('Should create a new order', async () => {
    const response = await request
      .post('/orders')
      .auth(token, { type: 'bearer' })
      .send(testOrder)
    expect(response.status).toBe(200)
  })
  it('Should return 401 unauthorized', async () => {
    const response = await request.post('/orders').send(testOrder)
    expect(response.status).toBe(401)
  })
  it('Should return list of orders', async () => {
    const response = await request
      .get('/orders')
      .auth(token, { type: 'bearer' })
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
  })

  it('Should create a new order', async () => {
    const product = { quantity: 2, product_id: 1, order_id: 1 }

    const response = await request
      .post(`/orders/${1}/products `)
      .auth(token, { type: 'bearer' })
      .send(product)
    expect(response.status).toBe(200)
  })
})
