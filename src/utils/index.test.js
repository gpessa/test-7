import { isUnmodified, sortProducts } from './index.ts'
import { PRODUCTS } from './../mocks'

describe('Check if an array is changed', () => {
  const test = [{
    id: 1,
    price: 10,
  }]

  it('Array is considered changed the first time I check if is unmodified', () => {
    expect(isUnmodified(test)).toBe(false)
  })

  it('Array is changed if an item is added', () => {
    test.push({
      id: 2,
      price: 3
    })
    expect(isUnmodified(test)).toBe(false)
  })

  it('Array is changed if an item is changed', () => {
    test[0].price = 2
    expect(isUnmodified(test)).toBe(false)
  })
})

describe('Testing sorting of products', () => {
  let MOCKED_PRODUCTS
  beforeEach(() => (MOCKED_PRODUCTS = [...PRODUCTS]))

  it('product are sorted correctly', () => {
    const result = sortProducts(MOCKED_PRODUCTS, { size: 2 })

    expect(result.highest).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 12, price: 13 }),
        expect.objectContaining({ id: 2, price: 11 }),
      ])
    );

    expect(result.lowest).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 8, price : 0 }),
        expect.objectContaining({ id: 5, price : 1 }),
      ])
    );
  })

  it('default size is 5', () => {
    const result = sortProducts(MOCKED_PRODUCTS)
    expect(result.highest).toHaveLength(5)
    expect(result.lowest).toHaveLength(5)
  })

  it('size of result can be choosed with the options', () => {
    const result = sortProducts(MOCKED_PRODUCTS, { size: 1 })
    expect(result.highest).toHaveLength(1)
    expect(result.lowest).toHaveLength(1)
  })

  it('if size higher than array length, priority should given to highest', () => {
    const result = sortProducts(MOCKED_PRODUCTS, { size: MOCKED_PRODUCTS.length })
    expect(result.highest).toHaveLength(PRODUCTS.length)
    expect(result.lowest).toBe(null)
  })

  it('if size higher than array length, priority should given to highest, lowest should be filled with remaining elements', () => {
    const result = sortProducts(MOCKED_PRODUCTS, { size: MOCKED_PRODUCTS.length - 1 })
    expect(result.highest).toHaveLength(PRODUCTS.length - 1)
    expect(result.lowest).toHaveLength(1)
  })

  it('if size is zero, null should be returned', () => {
    const result = sortProducts(MOCKED_PRODUCTS, { size: 0 })
    expect(result.highest).toBe(null)
    expect(result.lowest).toBe(null)
  })

  it('unmodified params should return null in the result', () => {
    let result

    result = sortProducts(PRODUCTS, { size: 1 })
    expect(result.highest).not.toBe(null)
    expect(result.lowest).not.toBe(null)

    result = sortProducts(PRODUCTS, { size: 1 })
    expect(result.highest).toBe(null)
    expect(result.lowest).toBe(null)
  })
})
