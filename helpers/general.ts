export function deleteKeys<T, K extends keyof T>(
  array: T[],
  keys: string[]
): any[] {
  array?.forEach((item) => {
    keys?.forEach((key) => {
      delete item[key]
    })
  })
  return array
}
