import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

let token: string

describe('Products Handler', () => {
  const testProduct = {
    id: 1,
    name: 'Apples',
    price: 20,
    category: 'Fruits',
  }

  beforeAll(async () => {
    const user = await request
      .post('/users/sign_in')
      .send({ firstName: 'Zeinab', password: 'pass123' })
    token = user.body
  })

  it('Should create a new product', async () => {
    const response = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(testProduct)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(jasmine.any(Object))
    expect(response.body.id).toBe(testProduct.id)
  })
  it('Should return 401 unauthorized', async () => {
    const response = await request.post('/products').send(testProduct)
    expect(response.status).toBe(401)
  })
  it('Should return list of products', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body).toEqual(jasmine.any(Array))
  })
})
