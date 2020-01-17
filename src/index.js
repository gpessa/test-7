const isChanged = (items) => {
  const newPicture = items.map(item => JSON.stringify(item)).toString()
  const isDifferent = (newPicture !== items.picture) && (items.picture !== undefined)

  // eslint-disable-next-line no-param-reassign
  items.picture = newPicture

  return isDifferent
}

const sortProducts = (items, options = { size: 5 }) => {
  const { size } = options

  const sortedProducts = [...items].sort((p1, p2) => p2.price - p1.price)

  const highest = sortedProducts.splice(0, size)
  const lowest = sortedProducts.reverse().splice(0, size)

  return {
    highest: !highest.length ? null : highest,
    lowest: !lowest.length ? null : lowest,
  }
}

export default sortProducts
export { isChanged }
