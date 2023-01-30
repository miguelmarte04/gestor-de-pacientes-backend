import { Request, Response } from 'express'
import moment = require('moment')
import {
  Business,
  Configuracion,
  Email,
  GroupeSanguin,
  Parameters,
  Phone,
  Position,
  Provinces,
  RelationShip,
  tipoDocumento,
  TypeAbsence,
  TypePermissions,
  WorkingDay,
} from '../entity/employee'
import { vacaciones } from '../helpers/general'
import { AnyType } from './authController'
const conexion = require('../database/db')

exports.registerGroupeSanguin = async (req: Request, res: Response) => {
  const { tipo_sangre, usuario_insercion } = await new GroupeSanguin(
    req.body.condition
  )
  conexion.query(
    'INSERT INTO tipos_sangre SET ?',
    {
      tipo_sangre: tipo_sangre,
      fecha_insercion: new Date(),
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar Tipo de Sangre',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Tipo de Sangre registrado con éxito',
        })
      }
    }
  )
}

exports.updateGroupeSanguin = async (req: Request, res: Response) => {
  const { id, estado, tipo_sangre, usuario_insercion } =
    await new GroupeSanguin(req.body.condition)

  conexion.query(
    'UPDATE tipos_sangre SET estado=?, tipo_sangre=?,usuario_insercion=?,fecha_insercion=? WHERE id = ?',
    [estado, tipo_sangre, usuario_insercion, new Date(), id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Tipo de Sangre',
          error: err?.sqlMessage,
        })
      } else {
        res
          .status(200)
          .send({ message: 'Tipo de Sangre Actualizado con éxito' })
      }
    }
  )
}
exports.registerPosition = async (req: Request, res: Response) => {
  const {
    cargo,
    usuario_insercion,
    sueldo_maximo,
    sueldo_minimo,
    id_departamento,
  } = await new Position(req.body.condition)
  conexion.query(
    'INSERT INTO cargos SET ?',
    {
      cargo: cargo,
      id_departamento: id_departamento,
      fecha_insercion: new Date(),
      usuario_insercion: usuario_insercion,
      sueldo_maximo: sueldo_maximo,
      sueldo_minimo: sueldo_minimo,
    },
    (err: AnyType, results: Response) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar Cargo',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Cargo registrado con éxito',
        })
      }
    }
  )
}

exports.updatePosition = async (req: Request, res: Response) => {
  const {
    id,
    estado,
    cargo,
    usuario_insercion,
    sueldo_maximo,
    sueldo_minimo,
    id_departamento,
  } = await new Position(req.body.condition)
  conexion.query(
    'UPDATE cargos SET estado=?, cargo=?,usuario_insercion=?,fecha_insercion=?,sueldo_maximo=?,sueldo_minimo=?,id_departamento=? WHERE id = ?',
    [
      estado,
      cargo,
      usuario_insercion,
      new Date(),
      sueldo_maximo,
      sueldo_minimo,
      id_departamento,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Cargo',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Cargo Actualizado con éxito' })
      }
    }
  )
}

exports.registerConfiguracion = async (req: Request, res: Response) => {
  const { descripcion, usuario_insercion, tipo } = await new Configuracion(
    req.body.condition
  )
  const request =
    tipo === 'tipo_documentos'
      ? 'INSERT INTO tipo_documentos SET ?'
      : tipo === 'tipo_permiso'
      ? 'INSERT INTO tipo_permiso SET ?'
      : tipo === 'tipo_licencia'
      ? 'INSERT INTO tipo_licencia SET ?'
      : tipo === 'tipo_falta'
      ? 'INSERT INTO tipo_falta SET ?'
      : tipo === 'tipo_razones_depidos'
      ? 'INSERT INTO tipo_razones_depidos SET ?'
      : tipo === 'tipo_razones_renuncias'
      ? 'INSERT INTO tipo_razones_renuncias SET ?'
      : ''

  const condition =
    tipo === 'tipo_documentos'
      ? {
          descripcion: descripcion,
          fecha_insercion: new Date(),
          usuario_insercion: usuario_insercion,
        }
      : tipo === 'tipo_permiso'
      ? {
          tipo_permiso: descripcion,
          fecha_insercion: new Date(),
          usuario_insercion: usuario_insercion,
        }
      : tipo === 'tipo_licencia'
      ? {
          tipo_licencia: descripcion,
          fecha_insercion: new Date(),
          usuario_insercion: usuario_insercion,
        }
      : tipo === 'tipo_falta'
      ? {
          tipo_falta: descripcion,
          fecha_insercion: new Date(),
          usuario_insercion: usuario_insercion,
        }
      : tipo === 'tipo_razones_depidos'
      ? {
          tipo_razon: descripcion,
          fecha_insercion: new Date(),
          usuario_insercion: usuario_insercion,
        }
      : tipo === 'tipo_razones_renuncias'
      ? {
          tipo_razon: descripcion,
          fecha_insercion: new Date(),
          usuario_insercion: usuario_insercion,
        }
      : {}
  conexion.query(request, condition, (err: AnyType, results: Response) => {
    if (err) {
      res.status(400).send({
        message: 'Error al registrar',
        error: err.sqlMessage,
      })
    } else {
      res.status(200).send({
        message: 'Registrado con éxito',
      })
    }
  })
}

exports.updateConfiguracion = async (req: Request, res: Response) => {
  const { descripcion, usuario_insercion, tipo, id, estado } =
    await new Configuracion(req.body.condition)
  const request =
    tipo === 'tipo_documentos'
      ? 'UPDATE tipo_documentos SET descripcion =?,usuario_insercion=?,fecha_insercion=?,estado=? WHERE id = ?'
      : tipo === 'tipo_permiso'
      ? 'UPDATE tipo_permiso SET tipo_permiso =?,usuario_insercion=?,fecha_insercion=?,estado=? WHERE id = ?'
      : tipo === 'tipo_licencia'
      ? 'UPDATE tipo_licencia SET tipo_licencia =?,usuario_insercion=?,fecha_insercion=?,estado=? WHERE id = ?'
      : tipo === 'tipo_falta'
      ? 'UPDATE tipo_falta SET tipo_falta =?,usuario_insercion=?,fecha_insercion=?,estado=? WHERE id = ?'
      : tipo === 'tipo_razones_depidos'
      ? 'UPDATE tipo_razones_depidos SET tipo_razon =?,usuario_insercion=?,fecha_insercion=?,estado=? WHERE id = ?'
      : tipo === 'tipo_razones_renuncias'
      ? 'UPDATE tipo_razones_renuncias SET tipo_razon =?,usuario_insercion=?,fecha_insercion=?,estado=? WHERE id = ?'
      : ''
  conexion.query(
    request,
    [descripcion, usuario_insercion, new Date(), estado, id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Actualizado con éxito' })
      }
    }
  )
}
exports.registerWorkingDay = async (req: Request, res: Response) => {
  const { jornada_trabajo, usuario_insercion } = await new WorkingDay(
    req.body.condition
  )
  conexion.query(
    'INSERT INTO jornada_trabajo SET ?',
    {
      jornada_trabajo: jornada_trabajo,
      fecha_insercion: new Date(),
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar Jornada Trabajo',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Jornada Trabajo registrado con éxito',
        })
      }
    }
  )
}

exports.updateWorkingDay = async (req: Request, res: Response) => {
  const { id, estado, jornada_trabajo, usuario_insercion } =
    await new WorkingDay(req.body.condition)
  conexion.query(
    'UPDATE jornada_trabajo SET estado=?, jornada_trabajo=?,usuario_insercion=?,fecha_insercion=? WHERE id = ?',
    [estado, jornada_trabajo, usuario_insercion, new Date(), id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Jornada Trabajo',
          error: err?.sqlMessage,
        })
      } else {
        res
          .status(200)
          .send({ message: 'Jornada Trabajo Actualizado con éxito' })
      }
    }
  )
}
exports.registerRelationShip = async (req: Request, res: Response) => {
  const { parentesco, usuario_insercion } = await new RelationShip(
    req.body.condition
  )
  conexion.query(
    'INSERT INTO parentesco SET ?',
    {
      parentesco: parentesco,
      fecha_insercion: new Date(),
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar Parentesco',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Parentesco registrado con éxito',
        })
      }
    }
  )
}

exports.updateRelationShip = async (req: Request, res: Response) => {
  const { id, estado, parentesco, usuario_insercion } = await new RelationShip(
    req.body.condition
  )
  conexion.query(
    'UPDATE parentesco SET estado=?, parentesco=?,usuario_insercion=?,fecha_insercion=? WHERE id = ?',
    [estado, parentesco, usuario_insercion, new Date(), id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Parentesco',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Parentesco Actualizado con éxito' })
      }
    }
  )
}
exports.registerPhone = async (req: Request, res: Response) => {
  const { tipo_telefono, usuario_insercion } = await new Phone(
    req.body.condition
  )
  conexion.query(
    'INSERT INTO tipos_telefono SET ?',
    {
      tipo_telefono: tipo_telefono,
      fecha_insercion: new Date(),
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar Tipo de Teléfono',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Tipo de Teléfono registrado con éxito',
        })
      }
    }
  )
}

exports.updatePhone = async (req: Request, res: Response) => {
  const { id, estado, tipo_telefono, usuario_insercion } = await new Phone(
    req.body.condition
  )
  conexion.query(
    'UPDATE tipos_telefono SET estado=?, tipo_telefono=?,usuario_insercion=?,fecha_insercion=? WHERE id = ?',
    [estado, tipo_telefono, usuario_insercion, new Date(), id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Tipo de Teléfono',
          error: err?.sqlMessage,
        })
      } else {
        res
          .status(200)
          .send({ message: 'Tipo de Teléfono Actualizado con éxito' })
      }
    }
  )
}

exports.registerParameters = async (req: Request, res: Response) => {
  const { estado, id_actividad, parametro, valor } = await new Parameters(
    req.body.condition
  )
  conexion.query(
    'INSERT INTO parametros SET ?',
    {
      id_actividad: id_actividad,
      parametro: parametro,
      valor: valor,
    },
    (err: AnyType, results: Response) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar Parámetro',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Parámetro registrado con éxito',
        })
      }
    }
  )
}

exports.updateParameters = async (req: Request, res: Response) => {
  const { id, estado, id_actividad, parametro, valor } = await new Parameters(
    req.body.condition
  )
  conexion.query(
    'UPDATE parametros SET estado=?, id_actividad=?,parametro=?,valor=?  WHERE id = ?',
    [estado, id_actividad, parametro, valor, id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Parámetro',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Parámetro Actualizado con éxito' })
      }
    }
  )
}

exports.updateBusiness = async (req: Request, res: Response) => {
  const { id, estado, background_color, logo, nombre_empresa } =
    await new Business(req.body.condition)
  conexion.query(
    'UPDATE empresas SET background_color=?,estado=?, logo=?,nombre_empresa=?  WHERE id = ?',
    [background_color, estado, logo, nombre_empresa, id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Empresa',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Empresa Actualizado con éxito' })
      }
    }
  )
}
exports.registerProvinces = async (req: Request, res: Response) => {
  const { id_pais, provincia, usuario_insercion } = await new Provinces(
    req.body.condition
  )
  conexion.query(
    'INSERT INTO provincia SET ?',
    {
      id_pais: id_pais,
      provincia: provincia,
      fecha_insercion: new Date(),
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar Provincia',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Provincia registrado con éxito',
        })
      }
    }
  )
}

exports.updateProvinces = async (req: Request, res: Response) => {
  const { id, estado, id_pais, provincia, usuario_insercion } =
    await new Provinces(req.body.condition)
  conexion.query(
    'UPDATE provincia SET estado=?, id_pais=?,provincia=?,usuario_insercion=?,fecha_insercion=?  WHERE id = ?',
    [estado, id_pais, provincia, usuario_insercion, new Date(), id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Provincia',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Provincia Actualizado con éxito' })
      }
    }
  )
}
exports.updateVacations = () => {
  conexion.query(
    `SELECT valor FROM parametros WHERE parametro = 'DIAS_NO_LABORABLES'`,
    (err: AnyType, results1: AnyType) => {
      conexion.query(
        `SELECT * FROM empleados`,
        (err: AnyType, results: AnyType) => {
          if (results?.length !== 0 && results !== undefined) {
            results?.forEach((empleado: AnyType) => {
              const vacacion = vacaciones(
                moment(empleado.fecha_contratacion),
                results.sueldo_vacaciones ?? 0,
                results1[0].valor
              )
              conexion.query('INSERT INTO vacaciones SET ?', {
                id_empleado: empleado.id,
                fecha_inicio: vacacion.fecha_inicio,
                fecha_fin: vacacion.fecha_fin,
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
}

exports.registerTipoDocumento = async (req: Request, res: Response) => {
  const { descripcion, usuario_insercion } = await new tipoDocumento(
    req.body.condition
  )
  conexion.query(
    'INSERT INTO tipo_documentos SET ?',
    {
      descripcion: descripcion,
      fecha_insercion: new Date(),
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar Tipo Documento',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({
          message: 'Tipo Documento registrado con éxito',
        })
      }
    }
  )
}

exports.updateTipoDocumento = async (req: Request, res: Response) => {
  const { id, estado, descripcion, usuario_insercion } =
    await new tipoDocumento(req.body.condition)
  conexion.query(
    'UPDATE tipo_documentos estado =?,descripcion=?,usuario_insercion=?, fecha_inercion=? SET  WHERE id = ?',
    [estado, descripcion, usuario_insercion, new Date(), id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Tipo Documento',
          error: err?.sqlMessage,
        })
      } else {
        res
          .status(200)
          .send({ message: 'Tipo Documento Actualizado con éxito' })
      }
    }
  )
}
