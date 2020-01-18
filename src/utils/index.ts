const isUnmodified = (items: Product[]): boolean => {
  const newPicture = items.map(item => JSON.stringify(item)).toString()
  const isSame = (newPicture === items.picture) && items.picture !== undefined
  items.picture = newPicture
  return isSame
}

const sortProducts = (items: Array<Product>, { size }: { size?: number } = { size: 5 }): SortedProduct => {
  const sortedProducts = [...items].sort((p1, p2) => p2.price - p1.price)

  if (isUnmodified(items))
    return {
      highest: null,
      lowest: null
    }

  const highest = sortedProducts.splice(0, size)
  const lowest = sortedProducts.reverse().splice(0, size)

  return {
    highest: !highest.length ? null : highest,
    lowest: !lowest.length ? null : lowest,
  }
}

export { isUnmodified, sortProducts }
