const jwt = require('jsonwebtoken')
// const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const { promisify } = require('util')
import { NextFunction, Response, Request } from 'express'
import { Empleados } from '../entity/auth'
export type AnyType<T = any> = T
const Cryptr = require('cryptr')
export const cryptr = new Cryptr('myTotalySecretKey')
exports.register = async (req: Request, res: Response) => {
  try {
    const {
      nombres,
      apellidos,
      // sexo,
      // doc_identidad,
      // tipo_doc_identidad,
      cedula,
      // fechaNacimiento,
      clave,
      // usuario_insercion,
    } = await new Empleados(req.body.condition)
    conexion.query(
      'INSERT INTO administradores SET ?',
      {
        nombres: nombres,
        apellidos: apellidos,
        // sexo: sexo,
        // doc_identidad: doc_identidad,
        // tipo_doc_identidad: tipo_doc_identidad,
        cedula: cedula,
        // fecha_nacimiento: fechaNacimiento,
        fecha_insercion: new Date(),
        // usuario_insercion: usuario_insercion,
        clave: cryptr.encrypt(clave),
      },
      (err: AnyType) => {
        if (err) {
          res.status(400).send({ message: err })
        } else {
          res.status(200).send({ message: 'Usuario registrado con exito' })
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}

exports.home = async (req: Request, res: Response) => {
  res.status(200).send({ message: 'Hello World' })
}
// exports.cambiarContra = async (req: Request, res: Response) => {
//   const { id, pass } = await new Empleados(req.body.condition)
//   conexion.query(
//     'UPDATE empleados SET pass = ? WHERE id = ?',
//     [await bcryptjs.hash(pass, 8), id],
//     (_err: AnyType, resultUpdate: AnyType) => {
//       if (resultUpdate?.length === 0) {
//         res.status(400).send({
//           message: 'Usuario o contraseña incorrectos',
//         })
//       } else {
//         res.status(200).send({
//           message: 'Contraseña actualizada con éxito',
//         })
//       }
//     }
//   )
// }

exports.login = async (req: Request, res: Response) => {
  try {
    const { user, password } = req.body

    if (!user || !password) {
      res
        .status(400)
        .send({ message: 'Por favor ingrese su usuario y/o contraseña' })
    } else {
      conexion.query(
        'SELECT * FROM administradores WHERE cedula = ? AND estado="A"',
        [user],
        async (_err: AnyType, results: AnyType) => {
          if (
            results?.length === 0 ||
            !(
              results?.[0]?.clave &&
              cryptr.decrypt(results?.[0]?.clave) === password
            )
          ) {
            conexion.query(
              'SELECT * FROM pacientes WHERE cedula = ? AND estado="A"',
              [user],
              async (_err: AnyType, results2: AnyType) => {
                if (
                  results2?.length === 0 ||
                  !(
                    results2?.[0]?.clave &&
                    cryptr.decrypt(results2?.[0]?.clave) === password
                  )
                ) {
                  conexion.query(
                    'SELECT * FROM doctores WHERE cedula = ? AND estado="A"',
                    [user],
                    async (_err: AnyType, results3: AnyType) => {
                      if (
                        results3?.length === 0 ||
                        !(
                          results3?.[0]?.clave &&
                          cryptr.decrypt(results3?.[0]?.clave) === password
                        )
                      ) {
                        conexion.query(
                          'SELECT * FROM recepcionistas WHERE cedula = ? AND estado="A"',
                          [user],
                          async (_err: AnyType, results4: AnyType) => {
                            if (
                              results4?.length === 0 ||
                              !(
                                results4?.[0]?.clave &&
                                cryptr.decrypt(results4?.[0]?.clave) ===
                                  password
                              )
                            ) {
                              res.status(400).send({
                                message: 'Usuario o contraseña incorrectos',
                              })
                            } else {
                              try {
                                const {
                                  id,
                                  usuario,
                                  nombres,
                                  apellidos,
                                  cedula,
                                } = results4[0]
                                const token = jwt.sign(
                                  { id: id },
                                  process.env.JWR_SECRETO,
                                  {
                                    expiresIn: process.env.JWT_TIEMPO_EXPIRA,
                                  }
                                )
                                const cookieOptions = {
                                  expires: new Date(
                                    Date.now() +
                                      Number(process.env.JWT_TIEMPO_EXPIRA) *
                                        24 *
                                        60 *
                                        60 *
                                        1000
                                  ),
                                }
                                const expirationDate = new Date()
                                expirationDate.setDate(
                                  expirationDate.getDate() + 1
                                )
                                res.cookie('jwt', token, cookieOptions)
                                res.status(200).send({
                                  data: {
                                    usuario: usuario ?? cedula,
                                    nombres: nombres,
                                    privilegios: 4,
                                    apellidos: apellidos,
                                    id: id,
                                    imagen: '',
                                    sessionCookie: {
                                      token: token,
                                      expiracion: expirationDate.toUTCString(),
                                    },
                                  },
                                })
                              } catch (error) {
                                res.status(400).send({ message: error })
                              }
                            }
                          }
                        )
                      } else {
                        try {
                          const {
                            id,
                            usuario,
                            nombre,
                            apellido,
                            imagen,
                            cedula,
                          } = results3[0]
                          const token = jwt.sign(
                            { id: id },
                            process.env.JWR_SECRETO,
                            {
                              expiresIn: process.env.JWT_TIEMPO_EXPIRA,
                            }
                          )
                          const cookieOptions = {
                            expires: new Date(
                              Date.now() +
                                Number(process.env.JWT_TIEMPO_EXPIRA) *
                                  24 *
                                  60 *
                                  60 *
                                  1000
                            ),
                          }
                          const expirationDate = new Date()
                          expirationDate.setDate(expirationDate.getDate() + 1)
                          res.cookie('jwt', token, cookieOptions)
                          res.status(200).send({
                            data: {
                              usuario: usuario ?? cedula,
                              nombres: nombre,
                              privilegios: 3,
                              apellidos: apellido,
                              imagen: imagen,
                              id: id,
                              sessionCookie: {
                                token: token,
                                expiracion: expirationDate.toUTCString(),
                              },
                            },
                          })
                        } catch (error) {
                          res.status(400).send({ message: error })
                        }
                      }
                    }
                  )
                } else {
                  try {
                    const { id, usuario, cedula, nombres, apellidos, imagen } =
                      results2[0]
                    const token = jwt.sign(
                      { id: id },
                      process.env.JWR_SECRETO,
                      {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA,
                      }
                    )
                    const cookieOptions = {
                      expires: new Date(
                        Date.now() +
                          Number(process.env.JWT_TIEMPO_EXPIRA) *
                            24 *
                            60 *
                            60 *
                            1000
                      ),
                    }
                    const expirationDate = new Date()
                    expirationDate.setDate(expirationDate.getDate() + 1)
                    res.cookie('jwt', token, cookieOptions)
                    res.status(200).send({
                      data: {
                        usuario: usuario ?? cedula,
                        nombres: nombres,
                        privilegios: 2,
                        apellidos: apellidos,
                        imagen: imagen,
                        id: id,
                        sessionCookie: {
                          token: token,
                          expiracion: expirationDate.toUTCString(),
                        },
                      },
                    })
                  } catch (error) {
                    res.status(400).send({ message: error })
                  }
                }
              }
            )
          } else {
            try {
              const { id, usuario, nombres, apellidos, imagen } = results[0]
              const token = jwt.sign({ id: id }, process.env.JWR_SECRETO, {
                expiresIn: process.env.JWT_TIEMPO_EXPIRA,
              })
              const cookieOptions = {
                expires: new Date(
                  Date.now() +
                    Number(process.env.JWT_TIEMPO_EXPIRA) * 24 * 60 * 60 * 1000
                ),
              }
              const expirationDate = new Date()
              expirationDate.setDate(expirationDate.getDate() + 1)
              res.cookie('jwt', token, cookieOptions)
              res.status(200).send({
                data: {
                  usuario: usuario,
                  nombres: nombres,
                  privilegios: 1,
                  apellidos: apellidos,
                  imagen: imagen,
                  id: id,
                  sessionCookie: {
                    token: token,
                    expiracion: expirationDate.toUTCString(),
                  },
                },
              })
            } catch (error) {
              res.status(400).send({ message: error })
            }
          }
        }
      )
    }
  } catch (error) {
    res.status(400).send({ message: error })
  }
}
exports.isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWR_SECRETO
      )
      conexion.query(
        'SELECT * FROM empleados WHERE id = ?',
        [decodificada.id],
        (results: AnyType) => {
          if (!results) {
            return next()
          }
          req.body.user = results[0]
          return next()
        }
      )
    } catch (error) {
      res.status(400).send({ message: error })

      return next()
    }
  } else {
    res.redirect('/login')
    next()
  }
}

exports.logout = (res: AnyType) => {
  res.clearCookie('jwt')
  res.send(200, { message: 'Sesión cerrada' })
}
