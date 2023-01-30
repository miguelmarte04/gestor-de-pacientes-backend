export type ValidationError = {
  message?: string
  path?: string[]
  type?: string
}
export type ParamsLocation = 'body' | 'query' | 'params'
export type ConditionType = {
  estado?: string
}
