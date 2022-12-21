export function filterDarkblocks(list, filter = null) {
  let filteredList = list

  if (filter && filter.include && filter.include.length > 0) {
    const lowerIncluded = filter.include.map((item) => {
      return item.toLowerCase()
    })

    if (lowerIncluded) {
      const included = filteredList.filter((item) => {
        return lowerIncluded.includes(item.arweaveTX.toLowerCase())
      })

      filteredList = included
    }
  }

  if (filter && filter.exclude && filter.exclude.length > 0) {
    const lowerExcluded = filter.exclude.map((item) => {
      return item.toLowerCase()
    })

    if (lowerExcluded) {
      const excluded = filteredList.filter((item) => {
        return !lowerExcluded.includes(item.arweaveTX.toLowerCase())
      })

      filteredList = excluded
    }
  }

  if (filter && filter.sort && filter.sort.length > 0) {
    const sortedList = []
    const sortValues = filter.sort.map((item) => {
      return item.toLowerCase()
    })

    sortValues.forEach((sortItem) => {
      const findDB = filteredList.find((item) => item.arweaveTX.toLowerCase() === sortItem.toLowerCase())
      if (findDB) {
        sortedList.push(findDB)
      }
    })

    const unSorted = filteredList.filter((item) => {
      return !sortValues.includes(item.arweaveTX.toLowerCase())
    })

    filteredList = sortedList.concat(unSorted)
  }

  return filteredList
}
