import { ProductsStore } from '../product'

const store = new ProductsStore()

describe('Product Model', () => {
  const testProduct = {
    id: 2,
    name: 'Cheese',
    price: 20,
    category: 'Diary',
  }
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })
  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('create method should add a Product', async () => {
    const result = await store.create(testProduct)
    expect(result).toEqual(testProduct)
  })

  it('index method should return a list of Products', async () => {
    const result = await store.index()
    expect(result).toHaveSize(2)
  })

  it('show method should return a product', async () => {
    const result = await store.show(testProduct.id)
    expect(result).toEqual(testProduct)
  })
})
