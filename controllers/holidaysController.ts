import { Request, Response } from 'express'
import { deleteNull, errorData } from '../constants/general'
import { Holidays } from '../entity/employee'
import { AnyType } from './authController'
const conexion = require('../database/db')

exports.getHolidays = async (req: Request, res: Response) => {
  try {
    const { id_empleado } = await new Holidays(req.body.condition)

    conexion.query(
      id_empleado
        ? `SELECT * FROM vacaciones WHERE id_empleado = ?`
        : `SELECT V.*,E.nombres,E.apellidos FROM vacaciones V, empleados E WHERE V.id_empleado = E.id`,
      [id_empleado],
      (err: AnyType, results: AnyType) => {
        if (results?.length === 0) {
          res.status(400).send({ message: errorData })
        } else {
          res.status(200).send({ data: results })
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}

exports.registerHolidays = async (req: Request, res: Response) => {
  const {
    id_empleado,
    observacion,
    usuario_insercion,
    fecha_inicio,
    fecha_fin,
    fecha_insercion,
  } = await new Holidays(req.body.condition)
  conexion.query(
    'INSERT INTO vacaciones SET ?',
    {
      id_empleado: id_empleado,
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
      fecha_insercion: fecha_insercion,
      observacion: observacion,
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar Vacaciones',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Vacaciones registrado con éxito',
        })
      }
    }
  )
}

exports.updateHolidays = async (req: Request, res: Response) => {
  const {
    id_empleado,
    fecha_fin,
    fecha_inicio,
    observacion,
    usuario_insercion,
    id,
    estado,
  } = await new Holidays(req.body.condition)

  conexion.query(
    'UPDATE vacaciones SET id_empleado = ?,fecha_fin = ?, fecha_inicio=?, observacion = ?,usuario_insercion = ?,estado = ? WHERE id = ?',
    [
      id_empleado,
      fecha_fin,
      fecha_inicio,
      observacion,
      usuario_insercion,
      estado,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Vacaciones',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Vacaciones Actualizado con éxito' })
      }
    }
  )
}
