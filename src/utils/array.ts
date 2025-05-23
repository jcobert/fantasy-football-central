export const forceArray = <T extends any = any>(item: T | T[]): Array<T> => {
  if (!item) return [] as T[]
  let newArray = item
  if (!Array.isArray(item)) {
    newArray = [item]
  }
  return newArray as T[]
}
