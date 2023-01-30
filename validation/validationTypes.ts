import * as Joi from 'joi'

export const requiredString = Joi.string().required()
export const joiString = Joi.string().allow(null, '')
export const joiNumber = Joi.number().allow(null)
export const positiveInteger = Joi.number().integer().positive()
export const requiredDate = Joi.date().required()
export const joiDate = Joi.date().allow(null)
export const joiJson = Joi.any()
export const requiredPositiveInteger = Joi.number()
  .required()
  .integer()
  .positive()
export const requirednumber = Joi.number().required()
