import { express } from '../app'
import { validateSchema } from '../database/validation'
import {
  cambiarContraSchema,
  personaSchema,
  registerConsultas,
  registerDoctor,
  registerEspecialidades,
  registerHorarios,
  registerPaciente,
  updateConsultas,
  updateDoctor,
  updateEspecialidades,
  updateHorarios,
  updatePaciente,
} from '../validation/validationORM'
const router = express.Router()
const authController = require('../controllers/authController')
const generalController = require('../controllers/generalController')
router.get('/', authController.home)
router.post('/register', validateSchema(personaSchema), authController.register)
router.put(
  '/cambiar_contra',
  validateSchema(cambiarContraSchema),
  authController.cambiarContra
)
router.post('/login', authController.login)
router.post('/consultas', generalController.getConsultas)
router.post(
  '/consultas/consulta',
  validateSchema(registerConsultas),
  generalController.registerConsultas
)
router.put(
  '/consultas/consulta',
  validateSchema(updateConsultas),
  generalController.updateConsultas
)
router.post('/pacientes', generalController.getPaciente)
router.post(
  '/pacientes/paciente',
  validateSchema(registerPaciente),
  generalController.registerPaciente
)
router.put(
  '/pacientes/paciente',
  validateSchema(updatePaciente),
  generalController.updatePaciente
)
router.post('/nacionalidades', generalController.getNacionalidades)
router.post('/seguros', generalController.getSeguros)
router.post('/doctores', generalController.getDoctores)
router.post(
  '/doctores/doctor',
  validateSchema(registerDoctor),
  generalController.registerDoctor
)
router.put(
  '/doctores/doctor',
  validateSchema(updateDoctor),
  generalController.updateDoctor
)
router.post('/especialidades', generalController.getEspecialidades)
router.post(
  '/especialidades/especialidad',
  validateSchema(registerEspecialidades),
  generalController.registerEspecialidades
)
router.put(
  '/especialidades/especialidad',
  validateSchema(updateEspecialidades),
  generalController.updateEspecialidades
)
router.post('/horarios', generalController.getHorarios)
router.post(
  '/horarios/horario',
  validateSchema(registerHorarios),
  generalController.registerHorarios
)
router.put(
  '/horarios/horario',
  validateSchema(updateHorarios),
  generalController.updateHorarios
)
router.get('/logout', authController.logout)
module.exports = router
