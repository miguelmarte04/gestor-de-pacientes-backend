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
    sexo: requiredString,
    doc_identidad: requiredString,
    usuario: requiredString,
    fechaNacimiento: requiredString,
    usuario_insercion: requiredString,
    pass: requiredString,
  }),
})
export const cambiarContraSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    pass: requiredString,
  }),
})

export const insertemployeeSchema = Joi.object().keys({
  condition: Joi.object().keys({
    nombres: requiredString,
    apellidos: requiredString,
    doc_identidad: joiString,
    fecha_nacimiento: requiredDate,
    sexo: requiredString,
    apodo: joiString,
    id_pais: requirednumber,
    tipo_doc_identidad: joiString,
    id_estado_civil: requirednumber,
    id_tipo_sangre: joiNumber,
    lugar_nacimiento: requiredString,
    usuario_insercion: requiredString,
    imagen: joiString,
  }),
})
export const insertAumentoSueldo = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    anterior_sueldo: requirednumber,
    nuevo_sueldo: requirednumber,
    observaciones: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const inserteNominas = Joi.object().keys({
  condition: Joi.object().keys({
    id_tipo_nomina: requirednumber,
    descripcion: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const inserteDescuentos = Joi.object().keys({
  condition: Joi.object().keys({
    id_nomina: requirednumber,
    id_empleado: requirednumber,
    nombre: requiredString,
    monto: requirednumber,
    descripcion: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const insertarDetNomina = Joi.object().keys({
  condition: Joi.object().keys({
    id_nomina: requirednumber,
    id_empleado: requirednumber,
    salario_bruto: requirednumber,
    usuario_insercion: requiredString,
  }),
})
export const inserteVacantes = Joi.object().keys({
  condition: Joi.object().keys({
    nombre: requiredString,
    puesto: requiredString,
    correo_contacto: requiredString,
    descripcion: requiredString,
    fecha_limite: requiredString,
    id_departamento: requirednumber,
    cantidad_maxima: requirednumber,
    usuario_insercion: requiredString,
  }),
})
export const inserteCandidatos = Joi.object().keys({
  id_vacante: requirednumber,
  nombres: requiredString,
  apellidos: requiredString,
  nivel_academico: requiredString,
  correo_electronico: requiredString,
  experiencia: requirednumber,
  telefono: requiredString,
  curriculum: requiredString,
  resumen: requiredString,
})
export const getDetNominas = Joi.object().keys({
  condition: Joi.object().keys({
    id: joiNumber,
  }),
})
export const registarTipoNomina = Joi.object().keys({
  condition: Joi.object().keys({
    tipo_nomina: requiredString,
    descuentos_empleado: requiredString,
    ingresos_empleados: requiredString,
    descuentos_fijos: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const getDetNominasEmpleado = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_nomina: requirednumber,
  }),
})
export const updateNominas = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_banco: joiNumber,
    estado: requiredString,
    estado_nomina: requiredString,
    id_tipo_nomina: requirednumber,
    descripcion: requiredString,
    fecha_registro: joiString,
    usuario_insercion: requiredString,
  }),
})
export const updateDecuentos = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_nomina: requirednumber,
    id_empleado: requirednumber,
    nombre: requiredString,
    estado: requiredString,
    monto: requirednumber,
    descripcion: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const updateTiposNomina = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    tipo_nomina: requiredString,
    descuentos_fijos: requiredString,
    descuentos_empleado: requiredString,
    ingresos_empleados: requiredString,
    usuario_insercion: requiredString,
    estado: requiredString,
  }),
})
export const updateVacantes = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    nombre: requiredString,
    puesto: requiredString,
    correo_contacto: requiredString,
    descripcion: requiredString,
    estado_publicacion: requiredString,
    usuario_insercion: requiredString,
    estado: requiredString,
    fecha_limite: requiredString,
    id_departamento: requirednumber,
    cantidad_maxima: requirednumber,
  }),
})
export const updateDetNominas = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    estado: requiredString,
    usuario_insercion: requiredString,
  }),
})

export const insertDespidoSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    observaciones: joiString,
    usuario_insercion: requiredString,
    id_tipo_razon_despido: requirednumber,
  }),
})
export const historialSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    tipo: requiredString,
  }),
})
export const insertRenunciaSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    observaciones: joiString,
    usuario_insercion: requiredString,
    id_tipo_razon_renuncia: requirednumber,
    imagen: joiString,
  }),
})
export const empresaSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
  }),
})
export const parametrosSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id_actividad: requiredString,
  }),
})
export const buscarPersonaSchema = Joi.object().keys({
  condition: Joi.object().keys({
    doc_identidad: requiredString,
  }),
})
export const registerGroupeSanguinSchema = Joi.object().keys({
  condition: Joi.object().keys({
    tipo_sangre: requiredString,
  }),
})
export const registerPositionSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id_departamento: requirednumber,
    cargo: requiredString,
    sueldo_minimo: requirednumber,
    sueldo_maximo: requirednumber,
    usuario_insercion: requiredString,
  }),
})
export const registerConfiguracionesSchema = Joi.object().keys({
  condition: Joi.object().keys({
    descripcion: requiredString,
    usuario_insercion: requiredString,
    tipo: requiredString,
  }),
})
export const registerWorkingDaySchema = Joi.object().keys({
  condition: Joi.object().keys({
    jornada_trabajo: requiredString,
  }),
})
export const registerPhoneSchema = Joi.object().keys({
  condition: Joi.object().keys({
    tipo_telefono: requiredString,
  }),
})
export const registerEmailSchema = Joi.object().keys({
  condition: Joi.object().keys({
    tipo_correo_electronico: requiredString,
  }),
})
export const registerDocumentosEmpleados = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    usuario_insercion: requiredString,
    id_tipo_documento: requirednumber,
    documento: requiredString,
  }),
})
export const registerTypeAbsenceSchema = Joi.object().keys({
  condition: Joi.object().keys({
    tipo_ausencia: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const registerTypePermissionsSchema = Joi.object().keys({
  condition: Joi.object().keys({
    tipo_permiso: requiredString,
  }),
})
export const registerParametersSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id_actividad: requiredString,
    parametro: requiredString,
    valor: requiredString,
  }),
})
export const registerBusinessSchema = Joi.object().keys({
  condition: Joi.object().keys({
    background_color: requirednumber,
    logo: requiredString,
    nombre_empresa: requiredString,
  }),
})
export const registerProvincesSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id_pais: requirednumber,
    provincia: requiredString,
  }),
})
export const registerTipoDocumentoSchema = Joi.object().keys({
  condition: Joi.object().keys({
    descripcion: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const updateTipoDocumentoSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    descripcion: requiredString,
    usuario_insercion: requiredString,
    estado: requiredString,
  }),
})
export const registerRelationShipSchema = Joi.object().keys({
  condition: Joi.object().keys({
    parentesco: requiredString,
  }),
})
export const updateGroupeSanguinSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    tipo_sangre: requiredString,
    estado: requiredString,
  }),
})
export const updatePositionSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    estado: requiredString,
    id_departamento: requirednumber,
    cargo: requiredString,
    sueldo_minimo: requirednumber,
    sueldo_maximo: requirednumber,
    usuario_insercion: requiredString,
  }),
})
export const updateConfiguracionesSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    estado: requiredString,
    descripcion: requiredString,
    usuario_insercion: requiredString,
    tipo: requiredString,
  }),
})
export const updateWorkingDaySchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    jornada_trabajo: requiredString,
    estado: requiredString,
  }),
})
export const updateRelationShipSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    parentesco: requiredString,
    estado: requiredString,
  }),
})
export const updatePhoneSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    tipo_telefono: requiredString,
    estado: requiredString,
  }),
})
export const updateEmailSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    tipo_correo_electronico: requiredString,
    estado: requiredString,
  }),
})
export const updateTypeAbsenceSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    tipo_ausencia: requiredString,
    estado: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const updateTypePermissionsSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    tipo_permiso: requiredString,
    estado: requiredString,
  }),
})
export const updateBusinessSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    background_color: requirednumber,
    logo: requiredString,
    nombre_empresa: requiredString,
    estado: requiredString,
  }),
})
export const updateProvincesSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    provincia: requiredString,
    id_pais: requirednumber,
    estado: requiredString,
  }),
})
export const updateParametersSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_actividad: requiredString,
    parametro: requiredString,
    valor: requiredString,
    estado: requiredString,
  }),
})
export const buscarEmpleadoSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requiredString,
  }),
})
export const GetDatosAcademicosSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    estado: joiString,
  }),
})
export const UpdateDatosAcademicosSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_empleado: requirednumber,
    id_nivel_academico: requirednumber,
    institucion: requiredString,
    fecha_finalizacion: requiredDate,
    observaciones: joiString,
    usuario_insercion: requiredString,
    estado: requiredString,
  }),
})
export const UpdateDespidoSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_empleado: requirednumber,
    cesantia: requirednumber,
    preaviso: requirednumber,
    regalia: requirednumber,
    observaciones: joiString,
    total_prestaciones: requirednumber,
    usuario_insercion: requiredString,
    estado: requiredString,
    id_tipo_razon_despido: requirednumber,
  }),
})
export const UpdateRenunciasSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_empleado: requirednumber,
    sueldo_vacaciones: requirednumber,
    regalia: requirednumber,
    observaciones: joiString,
    total_prestaciones: requirednumber,
    usuario_insercion: requiredString,
    estado: requiredString,
    imagen: joiString,
    id_tipo_razon_renuncia: requirednumber,
  }),
})
export const InsertDatosAcademicosSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    id_nivel_academico: requirednumber,
    institucion: requiredString,
    fecha_finalizacion: requiredDate,
    usuario_insercion: requiredString,
    observaciones: joiString,
  }),
})
export const UpdateDatosEmpleoSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id_departamento: requirednumber,
    id_tipo_nomina: requirednumber,
    id_jornada_trabajo: requirednumber,
    id_cargo: requirednumber,
    id_nomina: joiNumber,
    sueldo: joiNumber,
    id: requirednumber,
    id_tipo_pago: joiNumber,
    fecha_contratacion: requiredString,
    usuario_insercion: requiredString,
    honorifico: requiredString,
  }),
})
export const UpdateDepartamentoSchema = Joi.object().keys({
  condition: Joi.object().keys({
    id_departamento: requirednumber,
    id: requirednumber,
    usuario_insercion: requiredString,
  }),
})
export const updateEstadoEmpleadosSchema = Joi.object().keys({
  condition: Joi.object().keys({
    estado: requiredString,
    id: requirednumber,
    usuario_insercion: requiredString,
    accion: joiString,
  }),
})
export const UpdateEmployeeSchema = Joi.object().keys({
  condition: Joi.object().keys({
    apellidos: requiredString,
    tipo_doc_identidad: joiString,
    doc_identidad: joiString,
    fecha_contratacion: requiredString,
    apodo: joiString,
    imagen: joiString,
    fecha_nacimiento: requiredString,
    id: requirednumber,
    id_cargo: joiNumber,
    id_departamento: joiNumber,
    id_estado_civil: requirednumber,
    id_jornada_trabajo: joiNumber,
    id_pais: requirednumber,
    id_tipo_sangre: joiNumber,
    lugar_nacimiento: requiredString,
    nombres: requiredString,
    sexo: requiredString,
    sueldo: joiNumber,
    usuario: requiredString,
    estado: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const UpdateContactoEmergencia = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_empleado: requirednumber,
    id_parentesco: requirednumber,
    nombre: requiredString,
    direccion: requiredString,
    telefono: requiredString,
    estado: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const AsignarUsurios = Joi.object().keys({
  condition: Joi.object().keys({
    id_departamento: requirednumber,
    pass: requiredString,
    usuario: requiredString,
    usuario_insercion: requiredString,
    id_empleado: requirednumber,
  }),
})
export const GetVacaciones = Joi.object().keys({
  condition: Joi.object().keys({
    estado: requiredString,
  }),
})
export const UpdateVacaciones = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_empleado: requirednumber,
    fecha_inicio: requiredString,
    fecha_fin: requiredString,
    observacion: requiredString,
    estado: requiredString,
    estado_vacaciones: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const UpdateDirecciones = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_empleado: requirednumber,
    id_pais: requirednumber,
    id_provincia: requirednumber,
    calle: requiredString,
    principal: joiNumber,
    no_casa: requirednumber,
    info_adicional: joiString,
    estado: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const UpdateSolicitudVacaciones = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_empleado: requirednumber,
    fecha_inicio: requiredString,
    fecha_fin: requiredString,
    usuario_insercion: requiredString,
    estado_solicitud: requiredString,
    estado: requiredString,
  }),
})
export const UpdateTelefonos = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_empleado: requirednumber,
    principal: joiNumber,
    telefono: requiredString,
    estado: requiredString,
    id_tipo_telefono: requirednumber,
    usuario_insercion: requiredString,
  }),
})
export const RegisterContactoEmergencia = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    id_parentesco: requirednumber,
    nombre: requiredString,
    direccion: requiredString,
    telefono: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const RegisterDirecciones = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
  }),
})
export const RegisterTelefonos = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    telefono: requiredString,
    id_tipo_telefono: requirednumber,
    usuario_insercion: requiredString,
  }),
})
export const ContactoEmergencia = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    id_parentesco: requirednumber,
    nombre: requiredString,
    direccion: requiredString,
    telefono: requiredString,
  }),
})
export const registerEmails = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    correo_electronico: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const registerAbsence = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    id_tipo_ausencia: requirednumber,
    fecha: requiredString,
    observacion: joiString,
    usuario_insercion: requiredString,
  }),
})
export const getAbsence = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: joiNumber,
  }),
})
export const updateAbsence = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_empleado: requirednumber,
    id_tipo_ausencia: requirednumber,
    fecha: requiredString,
    observacion: joiString,
    usuario_insercion: requiredString,
    estado: requiredString,
  }),
})

export const registerDiscounts = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    id_descripcion_descuento: requirednumber,
    fecha_inicio: requiredString,
    fecha_vence: joiString,
    empleado: requirednumber,
    institucion: requirednumber,
    pendiente: requirednumber,
  }),
})
export const getDiscounts = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
  }),
})
export const updateDiscounts = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_empleado: requirednumber,
    id_descripcion_descuento: requirednumber,
    fecha_inicio: requiredString,
    fecha_vence: joiString,
    empleado: requirednumber,
    institucion: requirednumber,
    pendiente: requirednumber,
    estado: requiredString,
  }),
})
export const updateDepartamento = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    departamento: requiredString,
    id_empleado_encargado: requirednumber,
    usuario_insercion: requiredString,
    estado: requiredString,
  }),
})
export const registerDepartamento = Joi.object().keys({
  condition: Joi.object().keys({
    departamento: requiredString,
    id_empleado_encargado: requirednumber,
    usuario_insercion: requiredString,
  }),
})
export const registerHoliday = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    fecha_fin: requiredString,
    fecha_inicio: requiredString,
    observacion: joiString,
    usuario_insercion: requiredString,
  }),
})
export const registerPermissions = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    id_tipo_permiso: requirednumber,
    fecha_fin: requiredString,
    fecha_inicio: requiredString,
    imagenes: requiredString,
    observaciones: joiString,
    usuario_insercion: requiredString,
  }),
})
export const registerLacks = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    id_tipo_falta: requirednumber,
    observaciones: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const registerLicences = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    id_tipo_licencia: requirednumber,
    fecha_fin: requiredString,
    fecha_inicio: requiredString,
    imagenes: requiredString,
    observaciones: joiString,
    usuario_insercion: requiredString,
  }),
})
export const getHoliday = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: joiNumber,
  }),
})
export const updateHoliday = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_empleado: requirednumber,
    fecha_fin: requiredString,
    fecha_inicio: requiredString,
    observacion: joiString,
    usuario_insercion: requiredString,
    estado: requiredString,
  }),
})
export const updatePermissions = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    id_tipo_permiso: requirednumber,
    fecha_fin: requiredString,
    fecha_inicio: requiredString,
    imagenes: requiredString,
    observaciones: joiString,
    usuario_insercion: requiredString,
    estado: requiredString,
    id: requirednumber,
  }),
})
export const updateLacks = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    id_tipo_falta: requirednumber,
    observaciones: requiredString,
    usuario_insercion: requiredString,
    estado: requiredString,
    id: requirednumber,
  }),
})
export const updateLicences = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    id: requirednumber,
    id_tipo_licencia: requirednumber,
    fecha_fin: requiredString,
    fecha_inicio: requiredString,
    imagenes: requiredString,
    observaciones: joiString,
    usuario_insercion: requiredString,
    estado: requiredString,
  }),
})
export const registerTimeDelay = Joi.object().keys({
  condition: Joi.object().keys({
    motivo: requiredString,
    hora_llegada: requiredString,
    id_empleado: requirednumber,
    fecha: requiredString,
    observacion: joiString,
    usuario_insercion: requiredString,
  }),
})
export const getTimeDelay = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: joiNumber,
  }),
})
export const updateTimeDelay = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    motivo: requiredString,
    hora_llegada: requiredString,
    id_empleado: requirednumber,
    fecha: requiredString,
    observacion: joiString,
    estado: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const searchEmployee = Joi.object().keys({
  condition: Joi.object().keys({
    search: joiString,
    type: joiString,
  }),
})
export const changeHistoryEmployee = Joi.object().keys({
  condition: Joi.object().keys({
    doc_identidad: requiredString,
  }),
})
export const changeHistoryNominas = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
  }),
})
export const EmployeeData = Joi.object().keys({
  condition: Joi.object().keys({
    doc_identidad: requiredString,
  }),
})
export const updateEmails = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_empleado: requirednumber,
    principal: joiNumber,
    correo_electronico: requiredString,
    estado: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const updateDocumentosEmpleados = Joi.object().keys({
  condition: Joi.object().keys({
    id: requirednumber,
    id_empleado: requirednumber,
    id_tipo_documento: requirednumber,
    documento: requiredString,
    usuario_insercion: requiredString,
    estado: requiredString,
  }),
})
export const getContactosEmergencia = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
  }),
})
export const registerDirecciones = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    id_pais: requirednumber,
    id_provincia: requirednumber,
    calle: requiredString,
    no_casa: requirednumber,
    info_adicional: joiString,
    usuario_insercion: requiredString,
  }),
})
export const registerSolicitudVacaciones = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
    fecha_inicio: requiredString,
    fecha_fin: requiredString,
    usuario_insercion: requiredString,
  }),
})
export const getEmails = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
  }),
})
export const getDocumentosEmpleados = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
  }),
})
export const getTelefonos = Joi.object().keys({
  condition: Joi.object().keys({
    id_empleado: requirednumber,
  }),
})
