import { ProductsStore } from '../../product'

const store = new ProductsStore()

describe('Product Model', () => {
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
    const result = await store.create({
      id: 1,
      name: 'Apples',
      price: 20,
      category: 'Fruits',
    })
    expect(result).toEqual({
      id: 1,
      name: 'Apples',
      price: 20,
      category: 'Fruits',
    })
  })

  it('index method should return a list of Products', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: 1,
        name: 'Apples',
        price: 20,
        category: 'Fruits',
      },
    ])
  })
})
