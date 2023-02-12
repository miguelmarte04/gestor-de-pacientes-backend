import { Request, Response } from 'express'
import { Consultas, Paciente } from '../entity/general'
const conexion = require('../database/db')
import { errorData } from '../constants/general'
import { deleteKeys } from '../helpers/general'
export type AnyType<T = any> = T
const bcryptjs = require('bcryptjs')
exports.getConsultas = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT C.*,P.nombres nombre_paciente,P.apellidos apellido_paciente,D.nombre nombre_doctor,D.apellido apellido_doctor FROM citas C,pacientes P,doctores D WHERE C.id_paciente = P.id AND C.id_doctor = D.id',
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
exports.registerConsultas = async (req: Request, res: Response) => {
  const { id_paciente, id_doctor, asunto, fin, inicio } = await new Consultas(
    req.body.condition
  )
  conexion.query(
    'INSERT INTO citas SET ?',
    {
      id_paciente,
      id_doctor,
      asunto,
      inicio: new Date(inicio),
      fin: new Date(fin),
      fecha_insercion: new Date(),
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Consulta',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Consulta registrado con exito' })
      }
    }
  )
}
exports.updateConsultas = async (req: Request, res: Response) => {
  const { id, id_paciente, id_doctor, asunto, fin, inicio, estado } =
    await new Consultas(req.body.condition)

  conexion.query(
    'UPDATE citas SET id_paciente = ?,id_doctor = ?, asunto = ?, inicio = ?, fin = ?, fecha_insercion = ?, estado = ? WHERE id = ?',
    [
      id_paciente,
      id_doctor,
      asunto,
      new Date(inicio),
      new Date(fin),
      new Date(),
      estado,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Consulta',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Consulta Actualizado con exito' })
      }
    }
  )
}
exports.getPaciente = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT P.*,S.nombre seguro,N.nombre nacionalidad FROM pacientes P, seguros S,nacionalidad N WHERE P.id_seguro = S.id AND P.id_nacionalidad = N.id',
      (err: AnyType, results: AnyType) => {
        if (results?.length === 0) {
          res.status(400).send({ message: errorData })
        } else {
          res.status(200).send({ data: deleteKeys(results, ['clave']) })
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.registerPaciente = async (req: Request, res: Response) => {
  const {
    cedula,
    nombres,
    apellidos,
    fecha_nacimiento,
    id_seguro,
    id_nacionalidad,
    telefono,
    sexo,
    email,
    clave,
    imagen,
  } = await new Paciente(req.body.condition)
  conexion.query(
    'INSERT INTO pacientes SET ?',
    {
      cedula,
      nombres,
      apellidos,
      fecha_nacimiento,
      id_seguro,
      id_nacionalidad,
      imagen,
      telefono,
      sexo,
      email,
      clave: await bcryptjs.hash(clave, 8),
      fecha_insercion: new Date(),
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Paciente',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Paciente registrado con exito' })
      }
    }
  )
}
exports.updatePaciente = async (req: Request, res: Response) => {
  const {
    cedula,
    nombres,
    apellidos,
    fecha_nacimiento,
    id_seguro,
    id_nacionalidad,
    telefono,
    sexo,
    imagen,
    email,
    estado,
    id,
  } = await new Paciente(req.body.condition)

  conexion.query(
    'UPDATE pacientes SET cedula = ?,nombres = ?, apellidos = ?, fecha_nacimiento = ?,id_seguro = ?,id_nacionalidad = ?,telefono = ?, sexo = ?, email = ?, estado = ?,imagen = ? WHERE id = ?',
    [
      cedula,
      nombres,
      apellidos,
      new Date(fecha_nacimiento),
      id_seguro,
      id_nacionalidad,
      telefono,
      sexo,
      email,
      estado,
      imagen,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Paciente',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Paciente Actualizado con exito' })
      }
    }
  )
}
exports.getDoctores = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM doctores',
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

exports.getPaises = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM nacionalidad',
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
