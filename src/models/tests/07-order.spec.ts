import { OrdersStore } from '../order'

const store = new OrdersStore()

describe('Order Model', () => {
  const testOrder = {
    id: 2,
    status: 'Active',
    user_id: '1',
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

  it('create method should create new order', async () => {
    const result = await store.create(testOrder)
    expect(result).toEqual(testOrder)
  })

  it('show method should return an order', async () => {
    const result = await store.show(testOrder.id)
    expect(result).toEqual(testOrder)
  })

  it('index method should return a list of Orders', async () => {
    const result = await store.index()
    expect(result.length).toBe(2)
  })
})
