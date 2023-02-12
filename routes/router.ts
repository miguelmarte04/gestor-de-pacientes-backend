import { express } from '../app'
import { validateSchema } from '../database/validation'
import {
  cambiarContraSchema,
  personaSchema,
  registerConsultas,
  updateConsultas,
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
router.post('/paises', generalController.getPaises)
router.post('/doctores', generalController.getDoctores)
router.get('/logout', authController.logout)
module.exports = router
