import * as Joi from 'joi'
import { requiredDate } from './validationTypes'
import {
  joiNumber,
  joiString,
  requirednumber,
  requiredString,
} from './validationTypes'

export const personaSchema = Joi.object().keys({
  condition: Joi.object().keys({
    nombres: requiredString,
    apellidos: requiredString,
    // sexo: requiredString,
    // doc_identidad: requiredString,
    usuario: requiredString,
    // fechaNacimiento: requiredString,
    // usuario_insercion: requiredString,
    clave: requiredString,
  }),
})
export const cambiarContraSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    pass: requiredString,
  }),
})

export const updateConsultas = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_paciente: requirednumber,
    id_doctor: requirednumber,
    asunto: requiredString,
    inicio: requiredString,
    fin: requiredString,
    estado: requiredString,
  }),
})
export const registerConsultas = Joi.object().keys({
  condition: Joi.object().keys({
    id_paciente: requirednumber,
    id_doctor: requirednumber,
    asunto: requiredString,
    inicio: requiredString,
    fin: requiredString,
  }),
})
export const updatePaciente = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    cedula: requiredString,
    nombres: requiredString,
    apellidos: requiredString,
    fecha_nacimiento: requiredString,
    id_seguro: requirednumber,
    imagen: joiString,
    id_nacionalidad: requirednumber,
    telefono: requiredString,
    sexo: requiredString,
    email: requiredString,
    // clave: requiredString,
    estado: requiredString,
  }),
})
export const registerPaciente = Joi.object().keys({
  condition: Joi.object().keys({
    cedula: requiredString,
    nombres: requiredString,
    apellidos: requiredString,
    fecha_nacimiento: requiredString,
    id_seguro: requirednumber,
    id_nacionalidad: requirednumber,
    telefono: requiredString,
    imagen: joiString,
    sexo: requiredString,
    email: requiredString,
    clave: requiredString,
  }),
})
export const updateDoctor = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    cedula: requiredString,
    nombre: requiredString,
    apellido: requiredString,
    fecha_nacimiento: requiredString,
    id_especialidad: requirednumber,
    imagen: joiString,
    id_nacionalidad: requirednumber,
    telefono: requiredString,
    sexo: requiredString,
    correo: requiredString,
    // clave: requiredString,
    estado: requiredString,
  }),
})
export const registerDoctor = Joi.object().keys({
  condition: Joi.object().keys({
    cedula: requiredString,
    nombre: requiredString,
    apellido: requiredString,
    fecha_nacimiento: requiredString,
    id_especialidad: requirednumber,
    id_nacionalidad: requirednumber,
    telefono: requiredString,
    imagen: joiString,
    sexo: requiredString,
    correo: requiredString,
    clave: requiredString,
  }),
})

export const searchEmployee = Joi.object().keys({
  condition: Joi.object().keys({
    search: joiString,
    type: joiString,
  }),
})
