import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

import { token } from './01-users.spec'

describe('Products Handler', () => {
  const testProduct = {
    id: 1,
    name: 'Apples',
    price: 20,
    category: 'Fruits',
  }

  it('Should create a new product', async () => {
    const response = await request
      .post('/products')
      .auth(token, { type: 'bearer' })
      .send(testProduct)
    expect(response.status).toBe(200)
  })
  it('Should return 401 unauthorized', async () => {
    const response = await request.post('/products').send(testProduct)
    expect(response.status).toBe(401)
  })
  it('Should return list of products', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
  })
})
