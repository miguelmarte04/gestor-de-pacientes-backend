export const stringToBuffer = (
  stringData: string
  // encoding = 'utf8'
) => {
  if (!stringData) {
    return null
  }

  return Buffer.from(stringData).toString('base64')
}
