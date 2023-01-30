import { AnyType } from '../controllers/authController'

export const errorData = 'Data Not Found'

export const DbError = (message: string) => {
  return {
    message,
  }
}

export const deleteNull = (data: AnyType) => {
  data.map((item: any) => {
    Object.keys(item).forEach((key: string) => {
      if (item[key] === null) {
        item[key] = ''
      }
    })
  })
  return data
}
export const unirArrayEnObjeto = (array: AnyType): AnyType => {
  let obj = {}
  array.forEach((element: AnyType) => {
    obj = { ...obj, ...element }
  })
  return obj
}
