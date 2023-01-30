import { express } from '../app'
import { AnyType } from '../controllers/authController'
import moment = require('moment')
import { cronExpression, vacaciones } from '../helpers/general'
const conexion = require('../database/db')
const cron = require('node-cron')
import { validateSchema } from '../database/validation'
import {
  AsignarUsurios,
  buscarEmpleadoSchema,
  buscarPersonaSchema,
  cambiarContraSchema,
  changeHistoryEmployee,
  changeHistoryNominas,
  EmployeeData,
  empresaSchema,
  getContactosEmergencia,
  GetDatosAcademicosSchema,
  getDetNominas,
  getDetNominasEmpleado,
  getDocumentosEmpleados,
  getEmails,
  getHoliday,
  getTelefonos,
  GetVacaciones,
  historialSchema,
  insertarDetNomina,
  insertAumentoSueldo,
  InsertDatosAcademicosSchema,
  insertDespidoSchema,
  inserteCandidatos,
  inserteDescuentos,
  insertemployeeSchema,
  inserteNominas,
  inserteVacantes,
  insertRenunciaSchema,
  parametrosSchema,
  personaSchema,
  registarTipoNomina,
  registerBusinessSchema,
  registerConfiguracionesSchema,
  RegisterContactoEmergencia,
  registerDepartamento,
  registerDirecciones,
  RegisterDirecciones,
  registerDocumentosEmpleados,
  registerEmails,
  registerEmailSchema,
  registerGroupeSanguinSchema,
  registerHoliday,
  registerLacks,
  registerLicences,
  registerParametersSchema,
  registerPermissions,
  registerPhoneSchema,
  registerPositionSchema,
  registerProvincesSchema,
  registerRelationShipSchema,
  registerSolicitudVacaciones,
  RegisterTelefonos,
  registerTipoDocumentoSchema,
  registerWorkingDaySchema,
  searchEmployee,
  updateBusinessSchema,
  updateConfiguracionesSchema,
  UpdateContactoEmergencia,
  UpdateDatosAcademicosSchema,
  UpdateDatosEmpleoSchema,
  updateDecuentos,
  updateDepartamento,
  UpdateDepartamentoSchema,
  UpdateDespidoSchema,
  updateDetNominas,
  UpdateDirecciones,
  updateDocumentosEmpleados,
  updateEmails,
  updateEmailSchema,
  UpdateEmployeeSchema,
  updateEstadoEmpleadosSchema,
  updateGroupeSanguinSchema,
  updateHoliday,
  updateLacks,
  updateLicences,
  updateNominas,
  updateParametersSchema,
  updatePermissions,
  updatePhoneSchema,
  updatePositionSchema,
  updateProvincesSchema,
  updateRelationShipSchema,
  UpdateRenunciasSchema,
  UpdateSolicitudVacaciones,
  UpdateTelefonos,
  updateTipoDocumentoSchema,
  updateTiposNomina,
  UpdateVacaciones,
  updateVacantes,
  updateWorkingDaySchema,
} from '../validation/validationORM'
const router = express.Router()
const authController = require('../controllers/authController')
const employeeController = require('../controllers/employeeController')
const configurationsController = require('../controllers/configurationsController')
const holidaysController = require('../controllers/holidaysController')
const permissionsController = require('../controllers/permissionsOrLicensesController')
const generalController = require('../controllers/generalController')
router.get('/', authController.home)
router.post('/register', validateSchema(personaSchema), authController.register)
router.put(
  '/cambiar_contra',
  validateSchema(cambiarContraSchema),
  authController.cambiarContra
)
router.post('/login', authController.login)
router.post('/estado_civil', generalController.getCivilState)
router.post('/nivel_academico', generalController.getNivelAcademico)
router.post('/departamentos', generalController.getDepartamentos)
router.post(
  '/departamentos/departamento',
  validateSchema(registerDepartamento),
  generalController.registerDepartamentos
)
router.put(
  '/departamentos/departamento',
  validateSchema(updateDepartamento),
  generalController.updateDepartamentos
)
router.post('/tipos_sangre', generalController.getBloodType)
router.post('/paises', generalController.getPaises)
router.post('/provincias', generalController.getProvincias)
router.post('/nomina', generalController.getNomina)
router.post('/tipo_documentos', generalController.getTipoDocumentos)
router.post('/jornada_trabajo', generalController.getJornadaTrabajo)
router.post('/parentesco', generalController.getParentesco)
router.post('/cargo', generalController.getCargo)
router.post('/tipos_telefono', generalController.getTipoTelefono)
router.post('/tipo_permisos', employeeController.getTipoPermiso)
router.post('/tipo_faltas', employeeController.getTipoFalta)
router.post('/tipo_licencias', employeeController.getTipoLicencia)
router.post('/tipo_razon_despido', employeeController.getTipoRazonDespido)
router.post('/tipo_razon_renuncia', employeeController.getTipoRazonRenuncia)
router.post('/despidos', employeeController.getDespido)
router.post('/renuncias', employeeController.getRenuncias)
router.post('/getnominas', employeeController.getNominas)
router.post(
  '/getdetnominas',
  validateSchema(getDetNominas),
  employeeController.getDetNominas
)
router.post(
  '/tipo_nomina',
  validateSchema(registarTipoNomina),
  employeeController.registerTipoNomina
)
router.post(
  '/getdecuentosfijos',
  validateSchema(getDetNominas),
  employeeController.getDescuentosFijos
)
router.post(
  '/getdescuentosempleados',
  validateSchema(getDetNominasEmpleado),
  employeeController.getDescuentosEmpleados
)

router.post(
  '/descuentosempleados',
  validateSchema(inserteDescuentos),
  employeeController.registerDescuentos
)
router.post(
  '/registrar_empleado_nomina',
  validateSchema(insertarDetNomina),
  employeeController.registerDetNomina
)
router.post(
  '/registrarcandidato',
  validateSchema(inserteCandidatos),
  employeeController.registerCandidatos
)
router.post('/getcandidato', employeeController.getCandidatos)
router.put(
  '/descuentosempleados',
  validateSchema(updateDecuentos),
  employeeController.updateDescuentos
)
router.put(
  '/registrar_tipo_nomina',
  validateSchema(updateDecuentos),
  employeeController.updateDescuentos
)
router.put(
  '/tipo_nomina',
  validateSchema(updateTiposNomina),
  employeeController.updateTipoNomina
)
router.put(
  '/actualizar_estado_empleados_nomina',
  validateSchema(updateDetNominas),
  employeeController.updateDetNominas
)
router.post(
  '/getingresosempleados',
  validateSchema(getDetNominasEmpleado),
  employeeController.getIngresosEmpleados
)

router.post(
  '/ingresosempleados',
  validateSchema(inserteDescuentos),
  employeeController.registerIngresos
)
router.put(
  '/ingresosempleados',
  validateSchema(updateDecuentos),
  employeeController.updateIngresos
)
router.post('/getvacantes', employeeController.getVacantes)

router.post(
  '/vancantes',
  validateSchema(inserteVacantes),
  employeeController.registerVacantes
)
router.put(
  '/vancantes',
  validateSchema(updateVacantes),
  employeeController.updateVacantes
)
router.post(
  '/nominas',
  validateSchema(inserteNominas),
  employeeController.registerNominas
)
router.put(
  '/nominas',
  validateSchema(updateNominas),
  employeeController.updateNominas
)

router.post(
  '/empleados/empleado',
  validateSchema(insertemployeeSchema),
  employeeController.registerEmpleados
)
router.post(
  '/empleados/aumento_sueldo',
  validateSchema(insertAumentoSueldo),
  employeeController.registerAumentoSueldo
)
router.post(
  '/empleados/despido',
  validateSchema(insertDespidoSchema),
  employeeController.registerDespidos
)
router.post(
  '/empleados/historial',
  validateSchema(historialSchema),
  employeeController.getHistorial
)
router.post(
  '/empleados/renuncias',
  validateSchema(insertRenunciaSchema),
  employeeController.registerRenuncias
)
router.post(
  '/info_empresa',
  validateSchema(empresaSchema),
  generalController.getInfoEmpresa
)
router.post(
  '/parametros',
  validateSchema(parametrosSchema),
  generalController.getParametros
)
router.post(
  '/empleados/datosEmpleado',
  validateSchema(buscarEmpleadoSchema),
  employeeController.getEmpleado
)
router.post(
  '/empleados/datosAcademicos',
  validateSchema(GetDatosAcademicosSchema),
  employeeController.getDatosAcademicos
)
router.put(
  '/empleados/datosAcademicos',
  validateSchema(UpdateDatosAcademicosSchema),
  employeeController.updateDatosAcademicos
)
router.put(
  '/empleados/despido',
  validateSchema(UpdateDespidoSchema),
  employeeController.updateDespido
)
router.put(
  '/empleados/renuncias',
  validateSchema(UpdateRenunciasSchema),
  employeeController.updateRenuncias
)
router.post(
  '/empleados/datosAcademicos/registrar',
  validateSchema(InsertDatosAcademicosSchema),
  employeeController.registerInfoAcademica
)
router.put(
  '/empleados/datosDatosEmpleo',
  validateSchema(UpdateDatosEmpleoSchema),
  employeeController.updateDatosEmpleo
)
router.put(
  '/empleados/cambiodepartamento',
  validateSchema(UpdateDepartamentoSchema),
  employeeController.updateDepartamento
)
router.put(
  '/empleados/estadoEmpleado',
  validateSchema(updateEstadoEmpleadosSchema),
  employeeController.updateEstadoEmpleados
)
router.post(
  '/personas',
  validateSchema(buscarPersonaSchema),
  generalController.getPersonas
)
router.post(
  '/empleados/validarCedula',
  validateSchema(buscarPersonaSchema),
  employeeController.getIdExists
)
router.post(
  '/empleados/empleado/contactos_emergencia',
  validateSchema(RegisterContactoEmergencia),
  employeeController.registerContactosEmergencia
)
router.put(
  '/empleados/empleado/contactos_emergencia',
  validateSchema(UpdateContactoEmergencia),
  employeeController.updateContactosEmergencia
)
router.post(
  '/empleados/asignar_usuario',
  validateSchema(AsignarUsurios),
  employeeController.asignarUsurios
)
router.post(
  '/empleados/vacaciones',
  validateSchema(GetVacaciones),
  employeeController.getVacaciones
)
router.put(
  '/empleados/vacaciones/vacacion',
  validateSchema(UpdateVacaciones),
  employeeController.updateVacaciones
)

router.post(
  '/empleados/empleado/get_contactos_emergencia',
  validateSchema(getContactosEmergencia),
  employeeController.getContactosEmergencia
)
router.post(
  '/empleados/empleado/get_direcciones',
  validateSchema(RegisterDirecciones),
  employeeController.getDirecciones
)
router.put(
  '/empleados/empleado/direcciones',
  validateSchema(UpdateDirecciones),
  employeeController.updateDirecciones
)
router.post(
  '/empleados/empleado/direcciones',
  validateSchema(registerDirecciones),
  employeeController.registerDirecciones
)
router.put(
  '/empleados/solicitud_vacaciones',
  validateSchema(UpdateSolicitudVacaciones),
  employeeController.updateSolicitudVacaciones
)
router.post(
  '/empleados/solicitud_vacaciones',
  validateSchema(registerSolicitudVacaciones),
  employeeController.registerSolicitudVacaciones
)
router.post(
  '/empleados/getsolicitud_vacaciones',
  employeeController.getSolicitudVacaciones
)

router.post(
  '/empleados/empleado/email',
  validateSchema(registerEmails),
  employeeController.registerEmail
)

router.post(
  '/empleados/vacaciones',
  validateSchema(registerHoliday),
  holidaysController.registerHolidays
)

router.put(
  '/empleados/vacaciones',
  validateSchema(updateHoliday),
  holidaysController.updateHolidays
)
router.post(
  '/empleados/vacaciones/vacacion',
  validateSchema(getHoliday),
  holidaysController.getHolidays
)
router.post(
  '/empleados/permisos',
  validateSchema(registerPermissions),
  permissionsController.registerPermissions
)
router.post(
  '/empleados/faltas',
  validateSchema(registerLacks),
  permissionsController.registerLacks
)

router.put(
  '/empleados/permisos',
  validateSchema(updatePermissions),
  permissionsController.updatePermissions
)
router.put(
  '/empleados/faltas',
  validateSchema(updateLacks),
  permissionsController.updateLacks
)
router.post('/empleados/permisos/permiso', permissionsController.getPermissions)
router.post('/empleados/faltas/falta', permissionsController.getLack)
router.post(
  '/configuraciones/configuracion',
  employeeController.getConfiguraciones
)

router.post(
  '/empleados/licencias',
  validateSchema(registerLicences),
  permissionsController.registerLicences
)

router.put(
  '/empleados/licencias',
  validateSchema(updateLicences),
  permissionsController.updateLicences
)
router.post('/empleados/licencias/licencia', permissionsController.getLicences)

router.post(
  '/empleados',
  validateSchema(searchEmployee),
  employeeController.getEmpleados
)
router.post(
  '/empleados/historial_cambios',
  validateSchema(changeHistoryEmployee),
  employeeController.getHistoryChangeEmpleado
)
router.post(
  '/empleados/historial_cambios_nominas',
  validateSchema(changeHistoryNominas),
  employeeController.getHistoryChangeNomina
)
router.post(
  '/empleados/datos',
  validateSchema(EmployeeData),
  employeeController.getEmployeData
)
router.put(
  '/empleados/empleado/email',
  validateSchema(updateEmails),
  employeeController.updateEmail
)
router.put(
  '/empleados/empleado/documentos',
  validateSchema(updateDocumentosEmpleados),
  employeeController.updateDocumentosEmpleados
)
router.post(
  '/empleados/empleado/documentos',
  validateSchema(registerDocumentosEmpleados),
  employeeController.registerDocumentosEmpleados
)

router.post(
  '/empleados/empleado/get_email',
  validateSchema(getEmails),
  employeeController.getEmails
)
router.post(
  '/empleados/empleado/get_documentos',
  validateSchema(getDocumentosEmpleados),
  employeeController.getDocumentosEmpleados
)

router.post(
  '/empleados/empleado/telefonos',
  validateSchema(RegisterTelefonos),
  employeeController.registerTelefono
)
router.put(
  '/empleados/empleado/telefonos',
  validateSchema(UpdateTelefonos),
  employeeController.updateTelefono
)

router.post(
  '/empleados/empleado/obtenertelefonos',
  validateSchema(getTelefonos),
  employeeController.getTelefono
)
router.post(
  '/personas/persona',
  validateSchema(buscarPersonaSchema),
  generalController.getPersona
)
router.put(
  '/empleados/empleado',
  validateSchema(UpdateEmployeeSchema),
  employeeController.updateEmpleados
)

router.get('/logout', authController.logout)

router.post(
  '/tipos_sangre/tipo_sangre',
  validateSchema(registerGroupeSanguinSchema),
  configurationsController.registerGroupeSanguin
)
router.put(
  '/tipos_sangre/tipo_sangre',
  validateSchema(updateGroupeSanguinSchema),
  configurationsController.updateGroupeSanguin
)
router.post(
  '/cargos/cargo',
  validateSchema(registerPositionSchema),
  configurationsController.registerPosition
)
router.put(
  '/cargos/cargo',
  validateSchema(updatePositionSchema),
  configurationsController.updatePosition
)
router.post(
  '/configuraciones',
  validateSchema(registerConfiguracionesSchema),
  configurationsController.registerConfiguracion
)
router.put(
  '/configuraciones',
  validateSchema(updateConfiguracionesSchema),
  configurationsController.updateConfiguracion
)
router.post(
  '/parentesco/parentesco',
  validateSchema(registerRelationShipSchema),
  configurationsController.registerRelationShip
)
router.put(
  '/parentesco/parentesco',
  validateSchema(updateRelationShipSchema),
  configurationsController.updateRelationShip
)
router.post(
  '/telefonos/telefono',
  validateSchema(registerPhoneSchema),
  configurationsController.registerPhone
)
router.put(
  '/telefonos/telefono',
  validateSchema(updatePhoneSchema),
  configurationsController.updatePhone
)

router.post(
  '/parametros/parametro',
  validateSchema(registerParametersSchema),
  configurationsController.registerParameters
)
router.put(
  '/parametros/parametro',
  validateSchema(updateParametersSchema),
  configurationsController.updateParameters
)
router.put(
  '/empresas/empresa',
  validateSchema(updateBusinessSchema),
  configurationsController.updateBusiness
)
router.post(
  '/provincias/provincia',
  validateSchema(registerProvincesSchema),
  configurationsController.registerProvinces
)
router.put(
  '/provincias/provincia',
  validateSchema(updateProvincesSchema),
  configurationsController.updateProvinces
)
router.post(
  '/tipo_documento',
  validateSchema(registerTipoDocumentoSchema),
  configurationsController.registerTipoDocumento
)
router.put(
  '/tipo_documento',
  validateSchema(updateTipoDocumentoSchema),
  configurationsController.updateTipoDocumento
)
router.post(
  '/jornadas_trabajo/jornada_trabajo',
  validateSchema(registerWorkingDaySchema),
  configurationsController.registerWorkingDay
)
router.put(
  '/jornadas_trabajo/jornada_trabajo',
  validateSchema(updateWorkingDaySchema),
  configurationsController.updateWorkingDay
)

cron.schedule(cronExpression(moment().startOf('month'), true), () => {
  conexion.query(
    `SELECT valor FROM parametros WHERE parametro = 'DIAS_NO_LABORABLES'`,
    (err: AnyType, results1: AnyType) => {
      conexion.query(
        `SELECT * FROM empleados WHERE estado = ?`,
        ['A'],
        (err: AnyType, results: AnyType) => {
          if (results?.length !== 0 && results !== undefined) {
            results?.forEach((empleado: AnyType) => {
              const vacacion = vacaciones(
                moment(empleado.fecha_contratacion),
                empleado.sueldo ?? 0,
                results1[0].valor
              )
              conexion.query('INSERT INTO vacaciones SET ?', {
                id_empleado: empleado.id,
                fecha_inicio: vacacion.fecha_inicio?.toDate(),
                fecha_fin: vacacion.fecha_fin?.toDate(),
                sueldo_vacaciones: vacacion.sueldoVacaciones ?? 0,
                observacion: 'Generado por el sistema',
                fecha_insercion: new Date(),
                usuario_insercion: 'system',
              })
            })
            console.log('vacaciones generadas')
          }
        }
      )
    }
  )
})

cron.schedule(cronExpression(moment().startOf('day'), false), () => {
  conexion.query(
    `SELECT * FROM vacantes WHERE estado = ? AND fecha_fin >= ?`,
    ['A', new Date()],
    (err: AnyType, results: AnyType) => {
      if (results?.length !== 0 && results !== undefined) {
        results?.forEach((empleado: AnyType) => {
          conexion.query(
            'UPDATE vacantes SET estado = ? WHERE id = ?',
            ['I', empleado?.id],
            (err: AnyType, results: Response) => {
              if (err) {
                console.log(err)
              }
            }
          )
        })
      }
    }
  )
})

module.exports = router
