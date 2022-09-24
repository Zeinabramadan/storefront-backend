import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

import { token } from './01-users.spec'

describe('Dashboard Handler', () => {
  it('Gets products by category', async () => {
    const response = await request.get('/products/Fruits')
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
  })

  it('Gets category does not exist', async () => {
    const response = await request.get('/products/test')
    expect(response.status).toBe(200)
    expect(response.body).toEqual('No category with that name!')
  })
  it('Gets user orders', async () => {
    const response = await request
      .get(`/users/${1}/orders`)
      .auth(token, { type: 'bearer' })
    expect(response.status).toBe(200)
  })
  it('Should return list of products', async () => {
    const response = await request
      .get('/products_in_orders')
      .auth(token, { type: 'bearer' })
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
  })
})
