import sortProducts, { isChanged } from './index.js'

describe('Array is aware of changes', () => {
  const test = [{
    id: 1,
    price: 10,
  }]

  it('', () => {
    expect(isChanged(test)).toBe(false)
    expect(isChanged(test)).toBe(false)

    test.push({
      id: 1,
      price: 15,
    })

    expect(isChanged(test)).toBe(true)
    expect(isChanged(test)).toBe(false)

    test[0] = { id: 3, price: 12 }

    expect(isChanged(test)).toBe(true)
  })
})

describe('Testing sorting function TASKS', () => {
  let PRODUCTS

  beforeEach(() => {
    PRODUCTS = [
      {
        id: 1,
        price: 10,
      }, {
        id: 2,
        price: 11,
      }, {
        id: 3,
        price: 1,
      }, {
        id: 4,
        price: 3,
      }, {
        id: 5,
        price: 1,
      }, {
        id: 6,
        price: 8,
      }, {
        id: 7,
        price: 3,
      }, {
        id: 8,
        price: 0,
      }, {
        id: 9,
        price: 4,
      }, {
        id: 10,
        price: 5,
      }, {
        id: 11,
        price: 9,
      }, {
        id: 12,
        price: 13,
      },
    ]
  })

  it('product are sorted correctly, and the default number of result is 5', () => {
    const result = sortProducts(PRODUCTS)
    const EXPECTED_RESULT = { highest: [{ id: 12, price: 13 }, { id: 2, price: 11 }, { id: 1, price: 10 }, { id: 11, price: 9 }, { id: 6, price: 8 }], lowest: [{ id: 8, price: 0 }, { id: 5, price: 1 }, { id: 3, price: 1 }, { id: 7, price: 3 }, { id: 4, price: 3 }] }

    EXPECTED_RESULT.highest.forEach((expected, index) => {
      expect(expected.id).toBe(result.highest[index].id)
    })

    EXPECTED_RESULT.lowest.forEach((expected, index) => {
      expect(expected.id).toBe(result.lowest[index].id)
    })

    expect(EXPECTED_RESULT.highest.length).toBe(5)
    expect(EXPECTED_RESULT.lowest.length).toBe(5)
  })

  it('size of result can be choosed with the options', () => {
    const result = sortProducts(PRODUCTS, { size: 1 })

    expect(result.highest.length).toBe(1)
    expect(result.lowest.length).toBe(1)
  })

  it('if size higher than array length, priority should given to highest', () => {
    const result = sortProducts(PRODUCTS, { size: PRODUCTS.length })

    expect(result.highest.length).toBe(PRODUCTS.length)
    expect(result.lowest).toBe(null)
  })

  it('if size higher than array length, priority should given to highest, lowest should be filled with remaining elements', () => {
    const result = sortProducts(PRODUCTS, { size: PRODUCTS.length - 1 })

    expect(result.highest.length).toBe(PRODUCTS.length - 1)
    expect(result.lowest.length).toBe(1)
  })

  it('if size is zero, null should be returned', () => {
    const result = sortProducts(PRODUCTS, { size: 0 })

    expect(result.highest).toBe(null)
    expect(result.lowest).toBe(null)
  })
})
