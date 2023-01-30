import { AnyType } from '../controllers/authController'
const mysql = require('mysql')

const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
})
conexion.connect((err: AnyType) => {
  if (err) {
    console.log('El error de conexion es: ' + err)
  } else {
    console.log('Conexión establecida con la base de datos')
  }
})
module.exports = conexion
