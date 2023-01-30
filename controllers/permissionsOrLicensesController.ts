import { Request, Response } from 'express'
import { errorData } from '../constants/general'
import { Permissions } from '../entity/employee'
import { AnyType } from './authController'
const conexion = require('../database/db')

exports.getPermissions = async (req: Request, res: Response) => {
  try {
    conexion.query(
      `SELECT P.*,TP.tipo_permiso,E.nombres,E.id_departamento,E.apellidos,E.doc_identidad,E.imagen imagen_Empleado FROM permisos P,tipo_permiso TP,empleados E WHERE P.id_tipo_permiso = TP.id AND P.id_empleado = E.id`,
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
exports.getLack = async (req: Request, res: Response) => {
  try {
    conexion.query(
      `SELECT F.*,TF.tipo_falta,E.nombres,E.id_departamento,E.apellidos,E.doc_identidad,E.imagen imagen_Empleado FROM faltas F,tipo_falta TF,empleados E WHERE F.id_tipo_falta = TF.id AND F.id_empleado = E.id`,
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
exports.getLicences = async (req: Request, res: Response) => {
  try {
    conexion.query(
      `SELECT L.*,TL.tipo_licencia,E.nombres,E.id_departamento,E.apellidos,E.doc_identidad,E.imagen imagen_Empleado FROM licencias L,tipo_licencia TL,empleados E WHERE L.id_tipo_licencia = TL.id AND L.id_empleado = E.id`,
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

exports.registerPermissions = async (req: Request, res: Response) => {
  const {
    id_empleado,
    id_tipo_permiso,
    fecha_fin,
    fecha_inicio,
    imagenes,
    observaciones,

    usuario_insercion,
  } = await new Permissions(req.body.condition)
  conexion.query(
    'INSERT INTO permisos SET ?',
    {
      id_empleado: id_empleado,
      id_tipo_permiso: id_tipo_permiso,
      fecha_inicio: fecha_inicio,
      imagenes: imagenes,
      fecha_fin: fecha_fin,
      fecha_insercion: new Date(),
      observaciones: observaciones,
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar permiso ',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Permiso registrado con éxito',
        })
      }
    }
  )
}
exports.registerLacks = async (req: Request, res: Response) => {
  const { id_empleado, id_tipo_falta, observaciones, usuario_insercion } =
    await new Permissions(req.body.condition)
  conexion.query(
    'INSERT INTO faltas SET ?',
    {
      id_empleado: id_empleado,
      id_tipo_falta: id_tipo_falta,
      fecha_insercion: new Date(),
      observaciones: observaciones,
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar Falta ',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Falta registrado con éxito',
        })
      }
    }
  )
}
exports.registerLicences = async (req: Request, res: Response) => {
  const {
    id_empleado,
    id_tipo_licencia,
    fecha_fin,
    fecha_inicio,
    imagenes,
    observaciones,
    usuario_insercion,
  } = await new Permissions(req.body.condition)
  conexion.query(
    'INSERT INTO licencias SET ?',
    {
      id_empleado: id_empleado,
      id_tipo_licencia: id_tipo_licencia,
      fecha_inicio: fecha_inicio,
      imagenes: imagenes,
      fecha_fin: fecha_fin,
      fecha_insercion: new Date(),
      observaciones: observaciones,
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar licencia ',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Licencia registrada con éxito',
        })
      }
    }
  )
}

exports.updatePermissions = async (req: Request, res: Response) => {
  const {
    id_empleado: id_empleado,
    id_tipo_permiso: id_tipo_permiso,
    fecha_fin: fecha_fin,
    fecha_inicio: fecha_inicio,
    imagenes: imagenes,
    observaciones: observaciones,
    usuario_insercion: usuario_insercion,
    estado: estado,
    id: id,
  } = await new Permissions(req.body.condition)

  conexion.query(
    'UPDATE permisos SET id_empleado = ?,	id_tipo_permiso=?,fecha_fin = ?, fecha_inicio=?, observaciones = ?, imagenes = ?,usuario_insercion = ?,fecha_insercion = ?,estado = ? WHERE id = ?',
    [
      id_empleado,
      id_tipo_permiso,
      fecha_fin,
      fecha_inicio,
      observaciones,
      imagenes,
      usuario_insercion,
      new Date(),
      estado,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando permiso',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Permiso Actualizado con éxito',
        })
      }
    }
  )
}
exports.updateLacks = async (req: Request, res: Response) => {
  const {
    id_empleado: id_empleado,
    id_tipo_falta: id_tipo_falta,
    observaciones: observaciones,
    usuario_insercion: usuario_insercion,
    estado: estado,
    id: id,
  } = await new Permissions(req.body.condition)

  conexion.query(
    'UPDATE faltas SET id_empleado = ?,	id_tipo_falta=?, observaciones = ?, usuario_insercion = ?,fecha_insercion = ?,estado = ? WHERE id = ?',
    [
      id_empleado,
      id_tipo_falta,
      observaciones,
      usuario_insercion,
      new Date(),
      estado,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando falta',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Permiso Actualizado con éxito',
        })
      }
    }
  )
}
exports.updateLicences = async (req: Request, res: Response) => {
  const {
    id_empleado: id_empleado,
    id_tipo_licencia: id_tipo_licencia,
    fecha_fin: fecha_fin,
    fecha_inicio: fecha_inicio,
    imagenes: imagenes,
    observaciones: observaciones,
    usuario_insercion: usuario_insercion,
    estado: estado,
    id: id,
  } = await new Permissions(req.body.condition)

  conexion.query(
    'UPDATE licencias SET id_empleado = ?,	id_tipo_licencia=?,fecha_fin = ?, fecha_inicio=?, observaciones = ?, imagenes = ?,usuario_insercion = ?,fecha_insercion = ?,estado = ? WHERE id = ?',
    [
      id_empleado,
      id_tipo_licencia,
      fecha_fin,
      fecha_inicio,
      observaciones,
      imagenes,
      usuario_insercion,
      new Date(),
      estado,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando licencia',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Licencia Actualizado con éxito',
        })
      }
    }
  )
}
