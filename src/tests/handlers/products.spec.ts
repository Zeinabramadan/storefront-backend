import supertest from 'supertest'
import app from '../../server'
import { ProductsStore } from '../../models/product'
// import auth from '../../middleware/auth'

const request = supertest(app)
const products = new ProductsStore()

describe('Products Handler', () => {
  const testProduct = {
    id: 1,
    name: 'Apples',
    price: 20,
    category: 'Fruits',
  }

  it('Should return 401', async () => {
    const result = await request.post(
      '/products',
      async () => await products.create(testProduct)
    )
    expect(result.status).toBe(401)
  })
  // it('Should return 200', async () => {
  //   const result = await request.post(
  //     '/products',
  //     async () => await products.create(testProduct)
  //   )
  //   expect(result.status).toBe(200)
  // })
  // it('Should get list of products', async () => {
  //   const result = await request.get(
  //     '/products',
  //     async () => await products.index()
  //   )
  //   expect(result.body).toHaveSize(1)
  // })

  // it('index method should return a list of Products', async () => {
  //   const result = await store.index()
  //   expect(result).toEqual([testProduct])
  // })

  // it('show method should return a product', async () => {
  //   const result = await store.show(testProduct.id)
  //   expect(result).toEqual(testProduct)
  // })
})
