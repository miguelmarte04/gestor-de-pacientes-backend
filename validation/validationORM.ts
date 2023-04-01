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
    cedula: requiredString,
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
    id_tanda: requiredString,
    dia: requirednumber,
    asunto: requiredString,
    detalles_consulta: joiString,
    receta: joiString,
    estado: requiredString,
  }),
})
export const registerConsultas = Joi.object().keys({
  condition: Joi.object().keys({
    id_paciente: requirednumber,
    id_doctor: requirednumber,
    asunto: requiredString,
    id_tanda: requiredString,
    dia: requirednumber,
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
    email: joiString,
    // clave: requiredString,
    estado: requiredString,
  }),
})
export const updateRecepcionistas = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    cedula: requiredString,
    nombres: requiredString,
    apellidos: requiredString,
    fecha_nacimiento: requiredString,
    id_nacionalidad: requirednumber,
    telefono: requiredString,
    sexo: requiredString,
    email: joiString,
    estado: requiredString,
  }),
})
export const updateAdministradores = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    cedula: requiredString,
    nombres: requiredString,
    apellidos: requiredString,
    imagen: joiString,
    estado: requiredString,
  }),
})
export const updateDetCitas = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_consulta: requirednumber,
    id_tipo_lesion: requirednumber,
    id_color_lesion: requirednumber,
    id_enfermedad: requirednumber,
    localizacion: requiredString,
    antecedentes_patologicos: requiredString,
    tratamiento_previo: joiString,
    lesiones_anteriores: requiredString,
    fecha_lesion_anterior: joiString,
    detalles_extras: joiString,
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
    email: joiString,
    clave: requiredString,
  }),
})
export const existId = Joi.object().keys({
  condition: Joi.object().keys({
    cedula: requiredString,
  }),
})
export const registerRecepcionistas = Joi.object().keys({
  condition: Joi.object().keys({
    cedula: requiredString,
    nombres: requiredString,
    apellidos: requiredString,
    fecha_nacimiento: requiredString,
    id_nacionalidad: requirednumber,
    telefono: requiredString,
    sexo: requiredString,
    clave: requiredString,
  }),
})
export const registerAdministradores = Joi.object().keys({
  condition: Joi.object().keys({
    cedula: requiredString,
    nombres: requiredString,
    apellidos: requiredString,
    imagen: joiString,
    clave: requiredString,
  }),
})
export const registerDetCitas = Joi.object().keys({
  condition: Joi.object().keys({
    id_consulta: requirednumber,
    id_tipo_lesion: requirednumber,
    id_color_lesion: requirednumber,
    id_enfermedad: requirednumber,
    localizacion: requiredString,
    antecedentes_patologicos: requiredString,
    tratamiento_previo: joiString,
    lesiones_anteriores: requiredString,
    fecha_lesion_anterior: joiString,
    detalles_extras: joiString,
  }),
})
export const getDetCitas = Joi.object().keys({
  condition: Joi.object().keys({
    id_consulta: requirednumber,
  }),
})
export const getConsulta = Joi.object().keys({
  condition: Joi.object().keys({
    id_paciente: joiNumber,
    id_doctor: joiNumber,
    estado: requiredString,
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
    correo: joiString,
    exequatur: requiredString,
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
    exequatur: requiredString,
    correo: joiString,
    clave: requiredString,
  }),
})
export const updateEspecialidades = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    nombre: requiredString,
    estado: requiredString,
  }),
})
export const registerEspecialidades = Joi.object().keys({
  condition: Joi.object().keys({
    nombre: requiredString,
  }),
})
export const updateHorarios = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    tanda_manana: joiString,
    tanda_tarde: joiString,
    oficina: requiredString,
    id_doctor: requirednumber,
    estado: requiredString,
  }),
})
export const registerHorarios = Joi.object().keys({
  condition: Joi.object().keys({
    tanda_manana: joiString,
    tanda_tarde: joiString,
    oficina: requiredString,
    id_doctor: requirednumber,
  }),
})

export const searchEmployee = Joi.object().keys({
  condition: Joi.object().keys({
    search: joiString,
    type: joiString,
  }),
})
