import { Request, Response } from 'express'
import moment = require('moment')
import { deleteNull, errorData } from '../constants/general'
import {
  AsignarUsuario,
  candidatos,
  Contacto_Emergencia,
  Descuentos,
  Despidos,
  Direcciones,
  Empleados,
  Info_Academica,
  Ingresos,
  Nominas,
  Renuncias,
  Solicitud_Vacaciones,
  TipoNomina,
  Vacaciones,
  vacantes,
} from '../entity/employee'
import { Empleado, filter_state, Nomina } from '../entity/general'
import { AumentoSueldo, tipoDocumento } from '../entity/employee'
import {
  calcularPrestaciones,
  deleteKeys,
  isEqual,
  nomina,
  regalia,
  vacaciones,
} from '../helpers/general'
const conexion = require('../database/db')
export type AnyType<T = any> = T
const bcryptjs = require('bcryptjs')
exports.getEmpleados = async (req: Request, res: Response) => {
  const { search, type } = await new filter_state(req.body.condition)
  if (search && type) {
    try {
      conexion.query(
        search !== ' '
          ? `SELECT P.*,N.nombre nacionalidad,S.nombre seguro FROM pacientes P,nacionalidad N,seguros S WHERE P.id_nacionalidad = N.id AND P.id_seguro = S.id AND MATCH(apellidos,nombres,cedula) AGAINST(?)`
          : `SELECT P.*,N.nombre nacionalidad,S.nombre seguro FROM pacientes p LEFT JOIN nacionalidad N ON P.id_nacionalidad = N.id LEFT JOIN seguros S ON P.id_seguro = S.id
          UNION SELECT P.*,N.nombre nacionalidad,S.nombre seguro FROM pacientes p RIGHT JOIN nacionalidad N ON P.id_nacionalidad = N.id RIGHT JOIN seguros S ON P.id_seguro = S.id`,
        [search],
        (err: AnyType, results: AnyType) => {
          if (results?.length === 0 || results === undefined) {
            res.status(400).send({ message: errorData })
          } else {
            deleteKeys(results, ['pass'])
            res.status(200).send({
              data:
                type === 'search_register'
                  ? results?.filter((item: AnyType) => item?.id !== null)
                  : results
                      ?.filter((e: AnyType) => e?.estado === 'A')
                      ?.filter((item: AnyType) => item?.id !== null),
            })
          }
        }
      )
    } catch (error: AnyType) {
      res.status(400).send({ message: error })
    }
  } else {
    try {
      conexion.query(
        search !== ' '
          ? `SELECT P.*,N.nombre nacionalidad,S.nombre seguro FROM pacientes p LEFT JOIN nacionalidad N ON P.id_nacionalidad = N.id LEFT JOIN seguros S ON P.id_seguro = S.id AND MATCH(nombres,apellidos,cedula ) AGAINST(?) UNION SELECT P.*,N.nombre nacionalidad,S.nombre seguro FROM pacientes p RIGHT JOIN nacionalidad N ON P.id_nacionalidad = N.id RIGHT JOIN seguros S ON P.id_seguro = S.id AND MATCH(nombres,apellidos,cedula ) AGAINST(?)`
          : `SELECT P.*,N.nombre nacionalidad,S.nombre seguro FROM pacientes p LEFT JOIN nacionalidad N ON P.id_nacionalidad = N.id LEFT JOIN seguros S ON P.id_seguro = S.id
          UNION SELECT P.*,N.nombre nacionalidad,S.nombre seguro FROM pacientes p RIGHT JOIN nacionalidad N ON P.id_nacionalidad = N.id RIGHT JOIN seguros S ON P.id_seguro = S.id`,
        [search, search],
        (err: AnyType, results: AnyType) => {
          if (results?.length === 0) {
            res.status(400).send({ message: errorData })
          } else {
            deleteKeys(results, ['pass'])
            res.status(200).send({ data: results })
          }
        }
      )
    } catch (error: AnyType) {
      res.status(400).send({ message: error })
    }
  }
}
exports.getEmpleado = async (req: Request, res: Response) => {
  try {
    const { id } = await new Empleados(req.body.condition)

    conexion.query(
      `SELECT * FROM empleados WHERE id = ?`,
      [id],
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
exports.getTipoPermiso = async (req: Request, res: Response) => {
  try {
    conexion.query(
      `SELECT * FROM tipo_permiso`,
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
exports.getTipoFalta = async (req: Request, res: Response) => {
  try {
    conexion.query(
      `SELECT * FROM tipo_falta`,
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
exports.getTipoLicencia = async (req: Request, res: Response) => {
  try {
    conexion.query(
      `SELECT * FROM tipo_licencia`,
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
exports.getTipoRazonDespido = async (req: Request, res: Response) => {
  try {
    conexion.query(
      `SELECT * FROM tipo_razones_depidos`,
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
exports.getTipoRazonRenuncia = async (req: Request, res: Response) => {
  try {
    conexion.query(
      `SELECT * FROM tipo_razones_renuncias`,
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
exports.getDespido = async (req: Request, res: Response) => {
  try {
    conexion.query(
      `SELECT D.*,TD.tipo_razon,E.nombres,E.id_departamento,E.apellidos,E.doc_identidad,E.imagen imagen_Empleado FROM despidos D,tipo_razones_depidos TD,empleados E WHERE D.id_tipo_razon_despido = TD.id AND D.id_empleado = E.id`,
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
exports.getRenuncias = async (req: Request, res: Response) => {
  try {
    conexion.query(
      `SELECT R.*,TR.tipo_razon,E.nombres,E.apellidos,E.doc_identidad,E.imagen imagen_Empleado FROM renuncias R,tipo_razones_renuncias TR,empleados E WHERE R.id_tipo_razon_renuncia = TR.id AND R.id_empleado = E.id`,
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
exports.getNominas = async (req: Request, res: Response) => {
  try {
    conexion.query(
      `SELECT N.*,TN.tipo_nomina FROM nomina N, tipos_nominas TN WHERE N.id_tipo_nomina = TN.id`,
      (err: AnyType, results: AnyType) => {
        if (results?.length === 0) {
          res.status(400).send({ message: errorData })
        } else {
          // let nominas = []
          // const sueldo_neto = async () => {
          //   await Promise.all(
          //     results?.map(async (nomina: AnyType) => {
          //       conexion.query(
          //         `SELECT DN.id_nomina, ((IFNULL((SELECT sueldo_bruto FROM descuentos_fijos WHERE id_empleado = DN.id_empleado AND estado = 'A'),0) + IFNULL((SELECT SUM(monto) FROM ingresos_empleados WHERE id_nomina = DN.id_nomina AND id_empleado = E.id AND estado ='A'),0)) - IFNULL((SELECT SUM(monto) FROM descuentos_empleados WHERE id_nomina = DN.id_nomina AND id_empleado = E.id AND estado ='A'),0)) - IFNULL((SELECT total_descuento FROM descuentos_fijos WHERE id_empleado = DN.id_empleado AND estado = 'A'),0) sueldo_neto FROM detalle_nomina DN,empleados E,departamentos DP,cargos C WHERE DN.id_empleado = E.id AND E.id_departamento = DP.id AND E.id_cargo = C.id AND DN.id_nomina = ?`,
          //         [nomina?.id],
          //         (err: AnyType, results2: AnyType) => {
          //           // const nomina = []
          //           // results2?.map((item2) => {
          //           //   // nominas.push(item2)
          //           //   console.log(item2)
          //           // })
          //           return [...results2]
          //         }
          //       )
          //     })
          //   )
          // }

          // console.log(sueldo_neto)
          res.status(200).send({
            data: results,
          })
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.getDetNominas = async (req: Request, res: Response) => {
  try {
    const { id } = await new Empleados(req.body.condition)
    const query = id
      ? `SELECT DF.*,DN.*,E.nombres,E.apellidos,E.doc_identidad,E.imagen,E.fecha_nacimiento,E.sexo,DP.departamento,C.cargo, IFNULL((SELECT SUM(monto) FROM descuentos_empleados WHERE id_nomina = DN.id_nomina AND id_empleado = E.id AND estado ='A') + (SELECT SUM(total_descuento) FROM descuentos_fijos WHERE id_empleado = DN.id_empleado AND estado = 'A'),0) descuento, IFNULL((SELECT SUM(monto) FROM ingresos_empleados WHERE id_nomina = DN.id_nomina AND id_empleado = E.id AND estado ='A'),0) ingresos, 
      ((IFNULL((SELECT SUM(sueldo_bruto) FROM descuentos_fijos WHERE id_empleado = DN.id_empleado AND estado = 'A'),0) + IFNULL((SELECT SUM(monto) FROM ingresos_empleados WHERE id_nomina = DN.id_nomina AND id_empleado = E.id AND estado ='A'),0)) - IFNULL((SELECT SUM(monto) FROM descuentos_empleados WHERE id_nomina = DN.id_nomina AND id_empleado = E.id AND estado ='A'),0)) - IFNULL((SELECT SUM(total_descuento) FROM descuentos_fijos WHERE id_empleado = DN.id_empleado AND estado = 'A'),0) sueldo_neto
      FROM detalle_nomina DN,empleados E,departamentos DP,cargos C,descuentos_fijos DF WHERE DN.id_empleado = E.id AND E.id_departamento = DP.id AND E.id_cargo = C.id AND DF.id_empleado = DN.id_empleado AND DN.id_nomina = ?`
      : `SELECT DF.*, DN.*,E.nombres,E.apellidos,E.doc_identidad,E.imagen,E.fecha_nacimiento,E.sexo,DP.departamento,C.cargo, IFNULL((SELECT SUM(monto) FROM descuentos_empleados WHERE id_nomina = DN.id_nomina AND id_empleado = E.id AND estado ='A') + (SELECT SUM(total_descuento) FROM descuentos_fijos WHERE id_empleado = DN.id_empleado AND estado = 'A'),0) descuento, IFNULL((SELECT SUM(monto) FROM ingresos_empleados WHERE id_nomina = DN.id_nomina AND id_empleado = E.id AND estado ='A'),0) ingresos, ((IFNULL((SELECT SUM(sueldo_bruto) FROM descuentos_fijos WHERE id_empleado = DN.id_empleado AND estado = 'A'),0) + IFNULL((SELECT SUM(monto) FROM ingresos_empleados WHERE id_nomina = DN.id_nomina AND id_empleado = E.id AND estado ='A'),0)) - IFNULL((SELECT SUM(monto) FROM descuentos_empleados WHERE id_nomina = DN.id_nomina AND id_empleado = E.id AND estado ='A'),0)) - IFNULL((SELECT SUM(total_descuento) FROM descuentos_fijos WHERE id_empleado = DN.id_empleado AND estado = 'A'),0) sueldo_neto FROM detalle_nomina DN,empleados E,departamentos DP,cargos C,descuentos_fijos DF WHERE DN.id_empleado = E.id AND E.id_departamento = DP.id AND E.id_cargo = C.id AND DF.id_empleado = DN.id_empleado`
    conexion.query(query, [id], (err: AnyType, results: AnyType) => {
      if (results?.length === 0) {
        res.status(400).send({ message: errorData })
      } else {
        const nominas = []
        const numberTotal = results?.length
        let numberAcual = 0
        results?.map((item) => {
          const vacacion = vacaciones(
            moment(item.fecha_contratacion),
            item.sueldo ?? 0,
            item.valor
          )
          const regaliaFinal = regalia(
            moment(item.fecha_contratacion),
            item.sueldo
          )
          const prestaciones = calcularPrestaciones(
            moment(item.fecha_contratacion),
            item?.sueldo ?? 0,
            false,
            vacacion.sueldoVacaciones,
            regaliaFinal
          )
          nominas.push({
            ...item,
            cesantia: prestaciones.cesantia ?? 0,
            preaviso: prestaciones.preaviso ?? 0,
            regalia: prestaciones.regalia ?? 0,
            totalPrestaciones: prestaciones.totalPrestaciones ?? 0,
          })
          numberAcual++
        })
        if (numberTotal === numberAcual) {
          res.status(200).send({
            data: nominas,
          })
        }
      }
    })
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.updateDetNominas = async (req: Request, res: Response) => {
  const { id, estado, usuario_insercion } = await new Nominas(
    req.body.condition
  )

  conexion.query(
    'UPDATE `detalle_nomina` SET fecha_insercion = ?,usuario_insercion = ?,estado=? WHERE id = ?',
    [new Date(), usuario_insercion, estado, id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando la nomina',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Nomina Actualizado con exito' })
      }
    }
  )
}
exports.getDescuentosFijos = async (req: Request, res: Response) => {
  try {
    const { id } = await new Empleados(req.body.condition)
    conexion.query(
      'SELECT * FROM descuentos_fijos WHERE id_empleado = ?',
      [id],
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
exports.getDescuentosEmpleados = async (req: Request, res: Response) => {
  try {
    const { id, id_nomina } = await new Empleados(req.body.condition)
    conexion.query(
      'SELECT * FROM descuentos_empleados WHERE id_empleado = ? AND id_nomina = ?',
      [id, id_nomina],
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
exports.getIngresosEmpleados = async (req: Request, res: Response) => {
  try {
    const { id, id_nomina } = await new Empleados(req.body.condition)
    conexion.query(
      'SELECT * FROM ingresos_empleados WHERE id_empleado = ? AND id_nomina = ?',
      [id, id_nomina],
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
exports.registerNominas = async (req: Request, res: Response) => {
  const { id_tipo_nomina, usuario_insercion, descripcion } = await new Nominas(
    req.body.condition
  )
  conexion.query(
    'INSERT INTO nomina SET ?',
    {
      id_tipo_nomina: id_tipo_nomina,
      descripcion: descripcion,
      usuario_insercion: usuario_insercion,
      fecha_insercion: new Date(),
    },
    (err: AnyType) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar la nomina',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Nomina registrada correctamente' })
        conexion.query(
          `SELECT MAX(id) id FROM nomina`,
          (_, results: AnyType) => {
            conexion.query(
              `SELECT * FROM empleados WHERE id_tipo_nomina = ?`,
              [id_tipo_nomina],
              (_, results2: AnyType) => {
                results2?.map((empleado: AnyType) => {
                  conexion.query(
                    'INSERT INTO detalle_nomina SET ?',
                    {
                      id_nomina: results[0]?.id,
                      id_empleado: empleado.id,
                      salario_bruto: empleado?.sueldo ?? 0,
                      usuario_insercion: usuario_insercion,
                      fecha_insercion: new Date(),
                    },
                    (err: AnyType) => {
                      if (err) {
                        res.status(400).send({
                          message: 'Error al registrar el detalle de la nomina',
                          error: err.sqlMessage,
                        })
                      }
                    }
                  )
                })
              }
            )
          }
        )
      }
    }
  )
}

exports.updateNominas = async (req: Request, res: Response) => {
  const {
    id,
    id_tipo_nomina,
    id_banco,
    usuario_insercion,
    descripcion,
    fecha_registro,
    estado,
    estado_nomina,
  } = await new Nominas(req.body.condition)

  conexion.query(
    'UPDATE nomina SET id_tipo_nomina=?,id_banco=?, descripcion=?,fecha_insercion=?,fecha_registro=?,usuario_insercion=?,estado=?,estado_nomina=? WHERE id = ?',
    [
      id_tipo_nomina,
      id_banco,
      descripcion,
      new Date(),
      fecha_registro,
      usuario_insercion,
      estado,
      estado_nomina,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando la nomina',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Nomina Actualizado con exito' })
      }
    }
  )
}
exports.registerDescuentos = async (req: Request, res: Response) => {
  const {
    id_empleado,
    usuario_insercion,
    descripcion,
    id_nomina,
    nombre,
    monto,
  } = await new Descuentos(req.body.condition)
  conexion.query(
    'INSERT INTO descuentos_empleados SET ?',
    {
      id_nomina: id_nomina,
      id_empleado: id_empleado,
      descripcion: descripcion,
      usuario_insercion: usuario_insercion,
      fecha_insercion: new Date(),
      nombre: nombre,
      monto: monto,
    },
    (err: AnyType) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar el descuento',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Descuento registrado correctamente' })
      }
    }
  )
}
exports.registerTipoNomina = async (req: Request, res: Response) => {
  const {
    tipo_nomina,
    descuentos_empleado,
    ingresos_empleados,
    descuentos_fijos,
    usuario_insercion,
  } = await new TipoNomina(req.body.condition)
  conexion.query(
    'INSERT INTO tipos_nominas SET ?',
    {
      tipo_nomina: tipo_nomina,
      descuentos_empleado: descuentos_empleado,
      ingresos_empleados: ingresos_empleados,
      descuentos_fijos: descuentos_fijos,
      usuario_insercion: usuario_insercion,
      fecha_insercion: new Date(),
    },
    (err: AnyType) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar el tipo de nomina',
          error: err.sqlMessage,
        })
      } else {
        res
          .status(200)
          .send({ message: 'Tipo de Nomina registrado correctamente' })
      }
    }
  )
}
exports.registerDetNomina = async (req: Request, res: Response) => {
  const { id_nomina, id_empleado, salario_bruto, usuario_insercion } =
    await new Nominas(req.body.condition)
  conexion.query(
    'INSERT INTO detalle_nomina SET ?',
    {
      id_nomina: id_nomina,
      id_empleado: id_empleado,
      salario_bruto: salario_bruto,
      usuario_insercion: usuario_insercion,
      fecha_insercion: new Date(),
    },
    (err: AnyType) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar el Empleado en la Nomina',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Empleado registrado correctamente' })
      }
    }
  )
}

exports.updateDescuentos = async (req: Request, res: Response) => {
  const {
    id,
    id_empleado,
    usuario_insercion,
    descripcion,
    id_nomina,
    nombre,
    monto,
    estado,
  } = await new Descuentos(req.body.condition)

  conexion.query(
    'UPDATE descuentos_empleados SET id_empleado = ?, usuario_insercion = ?,descripcion = ?,id_nomina = ?,nombre = ?,monto = ?,estado = ?,fecha_insercion = ?  WHERE id = ?',
    [
      id_empleado,
      usuario_insercion,
      descripcion,
      id_nomina,
      nombre,
      monto,
      estado,
      new Date(),
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando la descuento',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Descuento Actualizado con éxito' })
      }
    }
  )
}
exports.updateTipoNomina = async (req: Request, res: Response) => {
  const {
    id,
    tipo_nomina,
    descuentos_empleado,
    ingresos_empleados,
    descuentos_fijos,
    usuario_insercion,
    estado,
  } = await new TipoNomina(req.body.condition)

  conexion.query(
    'UPDATE tipos_nominas SET tipo_nomina = ?, descuentos_empleado = ?,ingresos_empleados = ?,descuentos_fijos = ?, usuario_insercion = ?, estado = ?,	fecha_insercion = ?  WHERE id = ?',
    [
      tipo_nomina,
      descuentos_empleado,
      ingresos_empleados,
      descuentos_fijos,
      usuario_insercion,
      estado,
      new Date(),
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Tipo Nomina',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Tipo Nomina Actualizado con éxito' })
      }
    }
  )
}
exports.registerIngresos = async (req: Request, res: Response) => {
  const {
    id_empleado,
    usuario_insercion,
    descripcion,
    id_nomina,
    nombre,
    monto,
  } = await new Ingresos(req.body.condition)
  conexion.query(
    'INSERT INTO ingresos_empleados SET ?',
    {
      id_nomina: id_nomina,
      id_empleado: id_empleado,
      descripcion: descripcion,
      usuario_insercion: usuario_insercion,
      fecha_insercion: new Date(),
      nombre: nombre,
      monto: monto,
    },
    (err: AnyType) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar el ingreso',
          error: err.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Ingreso registrado correctamente' })
      }
    }
  )
}

exports.updateIngresos = async (req: Request, res: Response) => {
  const {
    id,
    id_empleado,
    usuario_insercion,
    descripcion,
    id_nomina,
    nombre,
    monto,
    estado,
  } = await new Ingresos(req.body.condition)

  conexion.query(
    'UPDATE ingresos_empleados SET id_empleado = ?, usuario_insercion = ?,descripcion = ?,id_nomina = ?,nombre = ?,monto = ?,estado = ?,fecha_insercion = ?  WHERE id = ?',
    [
      id_empleado,
      usuario_insercion,
      descripcion,
      id_nomina,
      nombre,
      monto,
      estado,
      new Date(),
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando la ingreso',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Ingreso Actualizado con éxito' })
      }
    }
  )
}
exports.registerSolicitudVacaciones = async (req: Request, res: Response) => {
  const { id_empleado, fecha_inicio, fecha_fin, usuario_insercion } =
    await new Solicitud_Vacaciones(req.body.condition)
  conexion.query(
    'INSERT INTO solicitud_vacaciones SET ?',
    {
      id_empleado: id_empleado,
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
      usuario_insercion: usuario_insercion,
      fecha_insercion: new Date(),
      estado_solicitud: 'G',
    },
    (err: AnyType) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar la solicitud de vacaciones',
          error: err.sqlMessage,
        })
      } else {
        res
          .status(200)
          .send({ message: 'Solicitud de Vacaciones registrada correctamente' })
      }
    }
  )
}

exports.updateSolicitudVacaciones = async (req: Request, res: Response) => {
  const {
    id,
    id_empleado,
    usuario_insercion,
    fecha_inicio,
    fecha_fin,
    estado_solicitud,
    estado,
  } = await new Solicitud_Vacaciones(req.body.condition)

  conexion.query(
    'UPDATE solicitud_vacaciones SET id_empleado = ?, fecha_inicio = ?,fecha_fin = ?,usuario_insercion = ?,estado_solicitud = ?,estado = ?,fecha_insercion = ? WHERE id = ?',
    [
      id_empleado,
      fecha_inicio,
      fecha_fin,
      usuario_insercion,
      estado_solicitud,
      estado,
      new Date(),
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando la solicitud de vacaciones',
          error: err?.sqlMessage,
        })
      } else {
        res
          .status(200)
          .send({ message: 'Solicitud de Vacaciones Actualizado con éxito' })
        if (estado_solicitud === 'A') {
          conexion.query(
            `SELECT valor FROM parametros WHERE parametro = 'DIAS_NO_LABORABLES'`,
            (err: AnyType, results1: AnyType) => {
              conexion.query(
                `SELECT * FROM empleados WHERE estado = ? AND id = ?`,
                ['A', id_empleado],
                (err: AnyType, results: AnyType) => {
                  if (results?.length !== 0 && results !== undefined) {
                    const vacacion =
                      (moment(results[0]?.fecha_contratacion),
                      results[0]?.sueldo ?? 0,
                      results1[0].valor)
                    conexion.query('INSERT INTO vacaciones SET ?', {
                      id_empleado: id_empleado,
                      fecha_inicio: fecha_inicio,
                      fecha_fin: fecha_fin,
                      sueldo_vacaciones: vacacion.sueldoVacaciones ?? 0,
                      observacion: 'Vacaciones Generadas',
                      fecha_insercion: new Date(),
                      usuario_insercion: usuario_insercion,
                    })
                  }
                }
              )
            }
          )
        }
      }
    }
  )
}

exports.getHistorial = async (req: Request, res: Response) => {
  try {
    const { id, tipo } = await new Empleados(req.body.condition)
    const tipos = [
      {
        tipo: 'falta',
        query:
          'SELECT FH.*,TF.tipo_falta,E.nombres,E.apellidos,E.doc_identidad FROM faltas_historial FH,tipo_falta TF,empleados E WHERE FH.id_tipo_falta = TF.id AND FH.id_empleado = E.id AND FH.id_empleado = ?',
      },
      {
        tipo: 'vacaciones',
        query:
          'SELECT VH.*,E.nombres,E.apellidos,E.doc_identidad FROM vacaciones_historial VH,empleados E WHERE VH.id_empleado = E.id AND VH.id_empleado = ?',
      },
      {
        tipo: 'renuncias',
        query:
          'SELECT RH.*,E.nombres,E.apellidos,E.doc_identidad,TR.tipo_razon FROM renuncias_historial RH,empleados E,tipo_razones_renuncias TR WHERE RH.id_empleado = E.id AND TR.id = RH.id_renuncia AND RH.id_empleado = ?',
      },
      {
        tipo: 'departamento',
        query:
          'SELECT DH.*,E.nombres,E.apellidos,E.doc_identidad FROM departamentos_historial DH,empleados E WHERE DH.id_empleado_encargado = E.id AND DH.id_departamento = ?',
      },
      {
        tipo: 'tipos_nominas',
        query: 'SELECT * FROM tipos_nominas',
      },
      {
        tipo: 'vacantes',
        query: 'SELECT * FROM vacantes_historial WHERE id_vacante = ?',
      },
      {
        tipo: 'bancos',
        query: 'SELECT * FROM bancos',
      },
    ]
    conexion.query(
      tipos?.find((item) => item.tipo === tipo)?.query,
      [id],
      (err: AnyType, results: AnyType) => {
        if (results?.length === 0) {
          res.status(400).send({ message: errorData })
        } else {
          res.status(200).send({ data: isEqual(results) })
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.getHistoryChangeEmpleado = async (req: Request, res: Response) => {
  try {
    const { doc_identidad } = await new Empleados(req.body.condition)

    conexion.query(
      `SELECT E.*,C.cargo,D.departamento,EC.estado_civil,JT.jornada_trabajo,P.pais,TS.tipo_sangre FROM empleados_historial_cambios E,cargos C,departamentos D,estado_civil EC,jornada_trabajo JT,paises P,tipos_sangre TS WHERE E.doc_identidad  = ? AND E.id_cargo = C.id AND E.id_departamento = D.id AND E.id_estado_civil = EC.id AND E.id_jornada_trabajo = JT.id AND E.id_pais = P.id AND E.id_tipo_sangre = TS.id`,
      [doc_identidad],
      (_, results: AnyType) => {
        if (results?.length === 0) {
          res.status(400).send({ message: errorData })
        } else {
          conexion.query(
            `SELECT E.*,TS.tipo_sangre FROM empleados E,tipos_sangre TS WHERE E.id_tipo_sangre = TS.id AND doc_identidad  = ? `,
            [doc_identidad],
            (_, results2: AnyType) => {
              conexion.query(
                `SELECT DE.*,PA.pais,PRO.provincia FROM direcciones_empleados_historial DE,paises PA,provincias PRO WHERE id_empleado = ? AND PA.id=DE.id_pais AND PRO.id=DE.id_provincia`,
                [results2[0]?.id],
                (_, results5: AnyType) => {
                  conexion.query(
                    `SELECT T.*,TT.tipo_telefono FROM telefonos_historial T,tipos_telefono TT WHERE id_empleado = ? AND T.id_tipo_telefono = TT.id `,
                    [results2[0]?.id],
                    (_, results6: AnyType) => {
                      conexion.query(
                        `SELECT CE.* FROM correos_electronicos_historial CE WHERE id_empleado = ?`,
                        [results2[0]?.id],
                        (_, results7: AnyType) => {
                          conexion.query(
                            `SELECT DE.*,TD.descripcion FROM documentos_empleados_historial DE, tipo_documentos TD WHERE DE.id_tipo_documento = TD.id AND DE.id_empleado = ?`,
                            [results2[0]?.id],
                            (_, results8: AnyType) => {
                              conexion.query(
                                `SELECT PH.*,TP.tipo_permiso FROM permisos_historial PH,tipo_permiso TP WHERE PH.id_tipo_permiso = TP.id AND PH.id_empleado =?`,
                                [results2[0]?.id],
                                (_, results9: AnyType) => {
                                  conexion.query(
                                    `SELECT LH.*,TL.tipo_licencia FROM licencias_historial LH,tipo_licencia TL WHERE LH.id_tipo_licencia = TL.id AND LH.id_empleado =?`,
                                    [results2[0]?.id],
                                    (_, results10: AnyType) => {
                                      conexion.query(
                                        `SELECT AU.*,E.nombres,E.apellidos FROM aumentos_sueldo AU,empleados E WHERE AU.id_empleado=E.id AND AU.id_empleado =?`,
                                        [results2[0]?.id],
                                        (_, results11: AnyType) => {
                                          res.status(200).send({
                                            data: {
                                              historial_empleado:
                                                isEqual(results),
                                              historial_direcciones_empleado:
                                                isEqual(results5),
                                              historial_telefonos_empleado:
                                                isEqual(results6),
                                              historial_correos_electronicos_empleado:
                                                isEqual(results7),
                                              historial_documentos_empleado:
                                                isEqual(results8),
                                              historial_permisos:
                                                isEqual(results9),
                                              historial_licencias:
                                                isEqual(results10),
                                              historial_aumentos_sueldo:
                                                isEqual(results11),
                                            },
                                          })
                                        }
                                      )
                                    }
                                  )
                                }
                              )
                            }
                          )
                        }
                      )
                    }
                  )
                }
              )
            }
          )
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.getHistoryChangeNomina = async (req: Request, res: Response) => {
  try {
    const { id } = await new Nominas(req.body.condition)

    conexion.query(
      `SELECT NH.*,TN.tipo_nomina FROM nomina_historial NH, tipos_nominas TN WHERE NH.id_tipo_nomina = TN.id AND NH.id_nomina = ?`,
      [id],
      (_, results: AnyType) => {
        conexion.query(
          `SELECT DH.*,E.nombres,E.apellidos FROM detalle_nomina_historial DH,empleados E WHERE DH.id_empleado = E.id AND id_nomina = ?`,
          [id],
          (_, results2: AnyType) => {
            conexion.query(
              `SELECT * FROM tipos_nominas_historial`,
              (_, results3: AnyType) => {
                conexion.query(
                  `SELECT DH.*,E.nombres,E.apellidos FROM descuentos_empleados_historial DH,empleados E WHERE DH.id_empleado = E.id AND DH.id_nomina = ?`,
                  [id],
                  (_, results4: AnyType) => {
                    conexion.query(
                      `SELECT DF.*,E.nombres,E.apellidos,TP.tipo_nomina FROM descuentos_fijos_historial DF,empleados E,tipos_nominas TP WHERE DF.id_empleado = E.id AND DF.id_tipo_nomina =TP.id`,
                      (_, results5: AnyType) => {
                        conexion.query(
                          `SELECT IH.*,E.nombres,E.apellidos FROM ingresos_empleados_historial IH,empleados E WHERE IH.id_empleado = E.id AND IH.id_nomina = ?`,
                          [id],
                          (_, results6: AnyType) => {
                            res.status(200).send({
                              data: {
                                historial_nominas: isEqual(results),
                                historial_detalles_nomina: isEqual(results2),
                                historial_tipos_nominas: isEqual(results3),
                                historial_descuentos_empleados:
                                  isEqual(results4),
                                historial_descuentos_fijos: isEqual(results5),
                                historial_ingresos_empleados: isEqual(results6),
                              },
                            })
                          }
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        )
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.getConfiguraciones = async (req: Request, res: Response) => {
  try {
    conexion.query(`SELECT * FROM tipo_documentos`, (_, results: AnyType) => {
      conexion.query(
        `SELECT *,tipo_permiso descripcion FROM tipo_permiso`,
        (_, results3: AnyType) => {
          conexion.query(
            `SELECT *,tipo_licencia descripcion FROM tipo_licencia`,
            (_, results4: AnyType) => {
              conexion.query(
                `SELECT *,tipo_falta descripcion FROM tipo_falta`,
                (_, results5: AnyType) => {
                  conexion.query(
                    `SELECT *,tipo_razon descripcion FROM tipo_razones_depidos`,
                    (_, results6: AnyType) => {
                      conexion.query(
                        `SELECT *,tipo_razon descripcion FROM tipo_razones_renuncias`,
                        (_, results7: AnyType) => {
                          conexion.query(
                            `SELECT * FROM cargos`,
                            (_, results8: AnyType) => {
                              res.status(200).send({
                                data: {
                                  tipo_documentos: results,
                                  tipo_permiso: results3,
                                  tipo_licencia: results4,
                                  tipo_falta: results5,
                                  tipo_razones_depidos: results6,
                                  tipo_razones_renuncias: results7,
                                  cargos: results8,
                                },
                              })
                            }
                          )
                        }
                      )
                    }
                  )
                }
              )
            }
          )
        }
      )
    })
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.getEmployeData = async (req: Request, res: Response) => {
  try {
    const { doc_identidad } = await new Empleados(req.body.condition)

    conexion.query(
      `SELECT
      E.*,
      C.cargo,
      D.departamento,
      EC.estado_civil,
      JT.jornada_trabajo,
      P.pais,
      TS.tipo_sangre,
      TN.tipo_nomina
  FROM
      empleados E
  LEFT JOIN cargos C ON
      E.id_cargo = C.id
  LEFT JOIN departamentos D ON
      E.id_departamento = D.id
      LEFT JOIN tipos_nominas TN ON
      E.id_tipo_nomina = TN.id
  LEFT JOIN estado_civil EC ON
      E.id_estado_civil = EC.id
  LEFT JOIN jornada_trabajo JT ON
      E.id_jornada_trabajo = JT.id
  LEFT JOIN paises P ON
      E.id_pais = P.id
  LEFT JOIN tipos_sangre TS ON
      E.id_tipo_sangre = TS.id WHERE E.doc_identidad = ?`,
      [doc_identidad],
      (_, results: AnyType) => {
        if (results?.length === 0) {
          res.status(400).send({ message: errorData })
        } else {
          conexion.query(
            `SELECT E.*,TS.tipo_sangre FROM empleados E,tipos_sangre TS WHERE E.id_tipo_sangre = TS.id AND doc_identidad  = ?`,
            [doc_identidad],
            (_, results2: AnyType) => {
              conexion.query(
                `SELECT DE.*,PA.pais,PRO.provincia FROM direcciones_empleados DE,paises PA,provincias PRO WHERE id_empleado = ? AND PA.id=DE.id_pais AND PRO.id=DE.id_provincia`,
                [results2[0]?.id],
                (_, results5: AnyType) => {
                  conexion.query(
                    `SELECT T.*,TT.tipo_telefono FROM telefonos T,tipos_telefono TT WHERE id_empleado = ? AND T.id_tipo_telefono = TT.id `,
                    [results2[0]?.id],
                    (_, results6: AnyType) => {
                      conexion.query(
                        `SELECT * FROM correos_electronicos WHERE id_empleado = ? `,
                        [results2[0]?.id],
                        (_, results7: AnyType) => {
                          res.status(200).send({
                            data: {
                              empleado: results,
                              direcciones_empleado: results5,
                              telefonos_empleado: results6,
                              correos_electronicos_empleado: results7,
                            },
                          })
                        }
                      )
                    }
                  )
                }
              )
            }
          )
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.getIdExists = async (req: Request, res: Response) => {
  try {
    const { doc_identidad } = await new Empleados(req.body.condition)

    conexion.query(
      `SELECT * FROM empleados WHERE doc_identidad  = ? `,
      [doc_identidad],
      (err: AnyType, results: AnyType) => {
        if (results?.length === 0) {
          res.status(200).send({ data: { existe: 0 } })
        } else {
          delete results[0].pass
          res
            .status(200)
            .send({ data: { existe: 1, datosEmpleado: results[0] } })
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.registerEmpleados = async (req: Request, res: Response) => {
  const {
    doc_identidad,
    tipo_doc_identidad,
    nombres,
    apellidos,
    fecha_nacimiento,
    sexo,
    imagen,
    id_tipo_sangre,
    lugar_nacimiento,
    usuario_insercion,
    id_estado_civil,
    id_pais,
    apodo,
  } = await new Empleados(req.body.condition)
  conexion.query(
    'INSERT INTO empleados SET ?',
    {
      nombres: nombres,
      apellidos: apellidos,
      sexo: sexo,
      apodo: apodo,
      doc_identidad: doc_identidad,
      tipo_doc_identidad: tipo_doc_identidad,
      lugar_nacimiento: lugar_nacimiento,
      fecha_nacimiento: fecha_nacimiento,
      fecha_insercion: new Date(),
      usuario_insercion: usuario_insercion,
      id_tipo_sangre: id_tipo_sangre,
      id_estado_civil: id_estado_civil,
      imagen: imagen,
      id_pais: id_pais,
    },
    (err: AnyType) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar empleado',
          error: err.sqlMessage,
        })
      }
    }
  )
  try {
    conexion.query(
      `SELECT * FROM empleados WHERE doc_identidad  = ?`,
      [doc_identidad],
      (err: AnyType, results: Response) => {
        if (!results) {
          res.status(400).send({ message: errorData })
        } else {
          res.status(200).send({
            message: 'Empleado registrado con exito',
            data: results,
          })
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.registerAumentoSueldo = async (req: Request, res: Response) => {
  const {
    id_empleado,
    anterior_sueldo,
    nuevo_sueldo,
    observaciones,
    usuario_insercion,
  } = await new AumentoSueldo(req.body.condition)
  conexion.query(
    'INSERT INTO aumentos_sueldo SET ?',
    {
      id_empleado: id_empleado,
      anterior_sueldo: anterior_sueldo,
      nuevo_sueldo: nuevo_sueldo,
      observaciones: observaciones,
      fecha_insercion: new Date(),
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType) => {
      if (err) {
        res.status(400).send({
          message: 'Error al registrar Aumento de Sueldo',
          error: err.sqlMessage,
        })
      } else {
        conexion.query(
          'UPDATE empleados SET sueldo = ?,usuario_insercion = ?,fecha_insercion = ?  WHERE id = ?',
          [nuevo_sueldo, usuario_insercion, new Date(), id_empleado],
          (err: AnyType) => {
            if (err) {
              res.status(400).send({
                message: 'Error al registrar Aumento de Sueldo',
                error: err.sqlMessage,
              })
            } else {
              const datos_nomina = nomina(nuevo_sueldo)
              conexion.query(
                'UPDATE descuentos_fijos SET sueldo_bruto = ?, sueldo_neto = ?, sueldo_anual = ?, ISR = ?, AFP = ?,SFS = ?,total_descuento = ?, fecha_insercion = ?, usuario_insercion = ? WHERE id_empleado = ?',
                [
                  datos_nomina?.sueldoBruto,
                  datos_nomina?.sueldo_neto,
                  datos_nomina?.sueldoAnual,
                  datos_nomina?.isr,
                  datos_nomina?.afp,
                  datos_nomina?.sfs,
                  datos_nomina?.total_descuento,
                  new Date(),
                  usuario_insercion,
                  id_empleado,
                ],
                (err: AnyType) => {
                  if (err) {
                    res.status(400).send({
                      message: 'Error al registrar Aumento de Sueldo',
                      error: err.sqlMessage,
                    })
                  } else {
                    res.status(200).send({
                      message: 'Aumento de Sueldo registrado con exito',
                    })
                  }
                }
              )
            }
          }
        )
      }
    }
  )
}

exports.updateEmpleados = async (req: Request, res: Response) => {
  const {
    apellidos,
    doc_identidad,
    fecha_contratacion,
    fecha_nacimiento,
    id,
    id_cargo,
    id_departamento,
    id_estado_civil,
    id_jornada_trabajo,
    estado,
    id_pais,
    id_tipo_sangre,
    lugar_nacimiento,
    nombres,
    tipo_doc_identidad,
    sexo,
    apodo,
    sueldo,
    imagen,
    usuario,
    usuario_insercion,
  } = await new Empleados(req.body.condition)

  conexion.query(
    'UPDATE empleados SET  apellidos = ?, doc_identidad  = ?, fecha_contratacion = ?, id_jornada_trabajo = ?, fecha_nacimiento=?, id_pais = ?,id_cargo = ?, id_tipo_sangre = ?, lugar_nacimiento = ?, nombres = ?,sueldo = ?,usuario = ?,id_departamento = ?, id_estado_civil = ?,sexo = ?,apodo = ?,imagen = ?,usuario_insercion = ?,fecha_insercion=?,tipo_doc_identidad=?,estado=? WHERE id = ?',
    [
      apellidos,
      doc_identidad,
      fecha_contratacion,
      id_jornada_trabajo,
      fecha_nacimiento,
      id_pais,
      id_cargo,
      id_tipo_sangre,
      lugar_nacimiento,
      nombres,
      sueldo,
      usuario,
      id_departamento,
      id_estado_civil,
      sexo,
      apodo,
      imagen,
      usuario_insercion,
      new Date(),
      tipo_doc_identidad,
      estado,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando empleado',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Empleado Actualizado con exito' })
      }
    }
  )
}
exports.registerDespidos = async (req: Request, res: Response) => {
  const {
    id_empleado,
    observaciones,
    usuario_insercion,
    id_tipo_razon_despido,
  } = await new Despidos(req.body.condition)
  conexion.query(
    `SELECT valor FROM parametros WHERE parametro = 'DIAS_NO_LABORABLES'`,
    (err: AnyType, results1: AnyType) => {
      conexion.query(
        `SELECT * FROM empleados WHERE id = ?`,
        [id_empleado],
        (err: AnyType, results: AnyType) => {
          const vacacion = vacaciones(
            moment(results[0].fecha_contratacion),
            results[0].sueldo ?? 0,
            results1[0].valor
          )
          const regaliaFinal = regalia(
            moment(results[0].fecha_contratacion),
            results[0].sueldo
          )
          const prestaciones = calcularPrestaciones(
            moment(results[0].fecha_contratacion),
            results[0]?.sueldo ?? 0,
            false,
            vacacion.sueldoVacaciones,
            regaliaFinal
          )

          conexion.query(
            'INSERT INTO despidos SET ?',
            {
              id_empleado: id_empleado,
              id_tipo_razon_despido: id_tipo_razon_despido,
              cesantia: prestaciones?.cesantia,
              preaviso: prestaciones?.preaviso,
              regalia: prestaciones?.regalia,
              total_prestaciones: prestaciones?.totalPrestaciones,
              observaciones: observaciones,
              fecha_insercion: new Date(),
              usuario_insercion: usuario_insercion,
            },
            (err: AnyType, results: Response) => {
              if (!results) {
                res.status(400).send({
                  message: 'Error al registrar despidos',
                  error: err?.sqlMessage,
                })
              } else {
                res
                  .status(200)
                  .send({ message: 'Despido registrado con éxito' })
              }
            }
          )
        }
      )
    }
  )
}

exports.updateDespido = async (req: Request, res: Response) => {
  const {
    id,
    id_empleado,
    cesantia,
    preaviso,
    regalia,
    total_prestaciones,
    observaciones,
    usuario_insercion,
    estado,
    id_tipo_razon_despido,
  } = await new Despidos(req.body.condition)

  conexion.query(
    'UPDATE despidos SET  id_empleado = ?,id_tipo_razon_despido = ?, cesantia  = ?, preaviso = ?, regalia = ?, total_prestaciones=?, usuario_insercion = ?,fecha_insercion = ?,estado=?,observaciones=? WHERE id = ?',
    [
      id_empleado,
      id_tipo_razon_despido,
      cesantia,
      preaviso,
      regalia,
      total_prestaciones,
      usuario_insercion,
      new Date(),
      estado,
      observaciones,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando despidos',
          error: err?.sqlMessage,
        })
      } else {
        if (estado === 'U') {
          conexion.query(
            'UPDATE empleados SET estado = ?,usuario_insercion = ?,fecha_insercion=? WHERE id = ?',
            ['I', usuario_insercion, new Date(), id_empleado],
            (err: AnyType, results: Response) => {
              if (!results) {
                res.status(400).send({
                  message: 'Error Actualizando empleado',
                  error: err?.sqlMessage,
                })
              } else {
                res
                  .status(200)
                  .send({ message: 'Despido Actualizado con exito' })
              }
            }
          )
        } else {
          res.status(200).send({ message: 'Despido Actualizado con exito' })
        }
      }
    }
  )
}
exports.registerRenuncias = async (req: Request, res: Response) => {
  const {
    id_empleado,
    observaciones,
    usuario_insercion,
    id_tipo_razon_renuncia,
    imagen,
  } = await new Renuncias(req.body.condition)
  conexion.query(
    `SELECT valor FROM parametros WHERE parametro = 'DIAS_NO_LABORABLES'`,
    (err: AnyType, results1: AnyType) => {
      conexion.query(
        `SELECT * FROM empleados WHERE id = ?`,
        [id_empleado],
        (err: AnyType, results: AnyType) => {
          const vacacion = vacaciones(
            moment(results[0].fecha_contratacion),
            results[0].sueldo ?? 0,
            results1[0].valor
          )
          const regaliaFinal = regalia(
            moment(results[0].fecha_contratacion),
            results[0].sueldo
          )
          const prestaciones = Number(vacacion?.sueldoVacaciones + regaliaFinal)

          conexion.query(
            'INSERT INTO renuncias SET ?',
            {
              id_empleado: id_empleado,
              id_tipo_razon_renuncia: id_tipo_razon_renuncia,
              regalia: regaliaFinal,
              total_prestaciones: prestaciones,
              observaciones: observaciones,
              fecha_insercion: new Date(),
              imagen: imagen,
              usuario_insercion: usuario_insercion,
            },
            (err: AnyType, results: Response) => {
              if (!results) {
                res.status(400).send({
                  message: 'Error al registrar Renuncia',
                  error: err?.sqlMessage,
                })
              } else {
                res
                  .status(200)
                  .send({ message: 'Renuncia registrado con éxito' })
              }
            }
          )
        }
      )
    }
  )
}

exports.updateRenuncias = async (req: Request, res: Response) => {
  const {
    id,
    id_empleado,
    sueldo_vacaciones,
    regalia,
    total_prestaciones,
    observaciones,
    usuario_insercion,
    estado,
    imagen,
    id_tipo_razon_renuncia,
  } = await new Renuncias(req.body.condition)

  conexion.query(
    'UPDATE renuncias SET  id_empleado = ?,id_tipo_razon_renuncia = ?, regalia = ?,sueldo_vacaciones=?, total_prestaciones=?, usuario_insercion = ?,fecha_insercion = ?,estado=?,observaciones=?,imagen=? WHERE id = ?',
    [
      id_empleado,
      id_tipo_razon_renuncia,
      regalia,
      sueldo_vacaciones,
      total_prestaciones,
      usuario_insercion,
      new Date(),
      estado,
      observaciones,
      imagen,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Renuncia',
          error: err?.sqlMessage,
        })
      } else {
        if (estado === 'U') {
          conexion.query(
            'UPDATE empleados SET estado = ?,usuario_insercion = ?,fecha_insercion=? WHERE id = ?',
            ['I', usuario_insercion, new Date(), id_empleado],
            (err: AnyType, results: Response) => {
              if (!results) {
                res.status(400).send({
                  message: 'Error Actualizando empleado',
                  error: err?.sqlMessage,
                })
              } else {
                res
                  .status(200)
                  .send({ message: 'Renuncia Actualizado con exito' })
              }
            }
          )
        } else {
          res.status(200).send({ message: 'Renuncia Actualizado con exito' })
        }
      }
    }
  )
}
exports.updateEstadoEmpleados = async (req: Request, res: Response) => {
  const { estado, id, usuario_insercion, accion } = await new Empleados(
    req.body.condition
  )

  conexion.query(
    'UPDATE empleados SET estado = ?,usuario_insercion = ?,fecha_insercion=? WHERE id = ?',
    [estado, usuario_insercion, new Date(), id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando empleado',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Empleado Actualizado con éxito' })
        if (accion === 'registar') {
          conexion.query(
            `SELECT * FROM empleados WHERE id = ?`,
            [id],
            (err: AnyType, results: AnyType) => {
              if (results?.length !== 0 && results !== undefined) {
                const datos_nomina = nomina(results[0]?.sueldo)
                conexion.query('INSERT INTO descuentos_fijos SET ?', {
                  id_tipo_nomina: results[0]?.id_tipo_nomina,
                  id_empleado: id,
                  sueldo_bruto: datos_nomina?.sueldoBruto,
                  sueldo_neto: datos_nomina?.sueldo_neto,
                  sueldo_anual: datos_nomina?.sueldoAnual,
                  ISR: datos_nomina?.isr,
                  AFP: datos_nomina?.afp,
                  SFS: datos_nomina?.sfs,
                  total_descuento: datos_nomina?.total_descuento,
                  fecha_insercion: new Date(),
                  usuario_insercion: usuario_insercion,
                })
                console.log('Nomina Generada')
              }
            }
          )
        }
      }
    }
  )
}

exports.getContactosEmergencia = async (req: Request, res: Response) => {
  try {
    const { id_empleado } = await new Contacto_Emergencia(req.body.condition)

    conexion.query(
      `SELECT CE.*,PA.parentesco FROM contactos_emergencia CE,parentesco PA WHERE CE.id_empleado = ? AND CE.id_parentesco = PA.id`,
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
exports.getSolicitudVacaciones = async (req: Request, res: Response) => {
  try {
    conexion.query(
      `SELECT SV.*,E.nombres,E.apellidos FROM solicitud_vacaciones SV,empleados E WHERE SV.id_empleado = E.id`,
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
exports.registerContactosEmergencia = async (req: Request, res: Response) => {
  const {
    id_empleado,
    id_parentesco,
    nombre,
    direccion,
    telefono,
    usuario_insercion,
  } = await new Contacto_Emergencia(req.body.condition)
  conexion.query(
    'INSERT INTO contactos_emergencia SET ?',
    {
      id_empleado: id_empleado,
      id_parentesco: id_parentesco,
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,
      fecha_insercion: new Date(),
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Contacto',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Contacto registrado con éxito' })
      }
    }
  )
}
exports.updateContactosEmergencia = async (req: Request, res: Response) => {
  const {
    id,
    id_empleado,
    id_parentesco,
    nombre,
    direccion,
    telefono,
    estado,
    usuario_insercion,
  } = await new Contacto_Emergencia(req.body.condition)

  conexion.query(
    'UPDATE contactos_emergencia SET id_empleado = ?, id_parentesco = ?, nombre = ?, direccion = ?, telefono = ?, usuario_insercion=?,fecha_insercion=?,estado = ? WHERE id = ?',
    [
      id_empleado,
      id_parentesco,
      nombre,
      direccion,
      telefono,
      usuario_insercion,
      new Date(),
      estado,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Contacto',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Contacto Actualizado con éxito' })
      }
    }
  )
}

exports.asignarUsurios = async (req: Request, res: Response) => {
  const { id_empleado, id_departamento, pass, usuario, usuario_insercion } =
    await new AsignarUsuario(req.body.condition)

  conexion.query(
    'UPDATE empleados SET id_privilegios = ?, pass = ?, usuario = ?, usuario_insercion = ?, fecha_insercion =? WHERE id = ?',
    [
      id_departamento === 8 ? 1 : 2,
      await bcryptjs.hash(pass, 8),
      usuario,
      usuario_insercion,
      new Date(),
      id_empleado,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Usuario',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Usuario Actualizado Exitosamente' })
      }
    }
  )
}
exports.getCandidatos = async (req: Request, res: Response) => {
  try {
    const { id_empleado } = await new Contacto_Emergencia(req.body.condition)

    conexion.query(
      `SELECT * FROM candidatos`,
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
exports.registerCandidatos = async (req: Request, res: Response) => {
  const {
    id_vacante,
    nombres,
    apellidos,
    correo_electronico,
    telefono,
    curriculum,
    resumen,
    experiencia,
    nivel_academico,
  } = await new candidatos(req.body)
  conexion.query(
    'INSERT INTO candidatos SET ?',
    {
      id_vacante: id_vacante,
      nombres: nombres,
      apellidos: apellidos,
      nivel_academico: nivel_academico,
      correo_electronico: correo_electronico,
      telefono: telefono,
      curriculum: curriculum,
      resumen: resumen,
      experiencia: experiencia,
      fecha_insercion: new Date(),
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Candidato',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Candidato registrado con éxito' })
      }
    }
  )
}
exports.getVacaciones = async (req: Request, res: Response) => {
  try {
    const { estado } = await new Vacaciones(req.body.condition)
    conexion.query(
      `SELECT DISTINCT(V.id_empleado) AS id_empleado,
      (SELECT V1.id
      FROM vacaciones AS V1
      WHERE V.id_empleado = V1.id_empleado ORDER BY V1.id DESC
      LIMIT 1) as id,
      (SELECT V1.estado_vacaciones
        FROM vacaciones AS V1
        WHERE V.id_empleado = V1.id_empleado ORDER BY V1.id DESC
        LIMIT 1) as estado_vacaciones,
      (SELECT E.imagen
      FROM empleados E
      WHERE E.id = V.id_empleado
      ) as imagen,
      (SELECT E.nombres
      FROM empleados E
      WHERE E.id = V.id_empleado
      ) as nombres,
      (SELECT E.apellidos
      FROM empleados E
      WHERE E.id = V.id_empleado
      ) as apellidos,
         (SELECT E.doc_identidad
      FROM empleados E
      WHERE E.id = V.id_empleado
      ) as doc_identidad,
      (SELECT V1.fecha_inicio
      FROM vacaciones AS V1
      WHERE V.id_empleado = V1.id_empleado ORDER BY V1.id DESC
      LIMIT 1) as fecha_inicio,
      (SELECT V1.sueldo_vacaciones
        FROM vacaciones AS V1
        WHERE V.id_empleado = V1.id_empleado ORDER BY V1.id DESC
        LIMIT 1) as sueldo_vacaciones,
      (SELECT V1.fecha_fin
      FROM vacaciones AS V1
      WHERE V.id_empleado = V1.id_empleado ORDER BY V1.id DESC
      LIMIT 1) as fecha_fin,
      (SELECT V1.fecha_insercion
      FROM vacaciones AS V1
      WHERE V.id_empleado = V1.id_empleado ORDER BY V1.id DESC
      LIMIT 1) as fecha_insercion,
      (SELECT V1.observacion
      FROM vacaciones AS V1
      WHERE V.id_empleado = V1.id_empleado ORDER BY V1.id DESC
      LIMIT 1) as observacion,
      (SELECT V1.usuario_insercion
      FROM vacaciones AS V1
      WHERE V.id_empleado = V1.id_empleado ORDER BY V1.id DESC
      LIMIT 1) as usuario_insercion,
      (SELECT V1.estado
      FROM vacaciones AS V1
      WHERE V.id_empleado = V1.id_empleado ORDER BY V1.id DESC
      LIMIT 1) as estado
      FROM vacaciones AS V WHERE V.estado=? ORDER BY V.id DESC`,
      [estado],
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

exports.updateVacaciones = async (req: Request, res: Response) => {
  const {
    id,
    id_empleado,
    fecha_inicio,
    fecha_fin,
    observacion,
    estado_vacaciones,
    estado,
    usuario_insercion,
  } = await new Vacaciones(req.body.condition)

  conexion.query(
    'UPDATE vacaciones SET id_empleado = ?, fecha_inicio = ?, fecha_fin = ?, fecha_insercion = ?, observacion = ?, usuario_insercion=?,estado = ?,estado_vacaciones = ? WHERE id = ?',
    [
      id_empleado,
      fecha_inicio,
      fecha_fin,
      new Date(),
      observacion,
      usuario_insercion,
      estado,
      estado_vacaciones,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Vacaciones',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Vacaciones Actualizada con éxito' })
      }
    }
  )
}

exports.getDirecciones = async (req: Request, res: Response) => {
  try {
    const { id_empleado } = await new Direcciones(req.body.condition)

    conexion.query(
      `SELECT DE.*,PA.pais,PRO.provincia FROM direcciones_empleados DE,paises PA,provincias PRO WHERE DE.id_empleado = ? AND PA.id=DE.id_pais AND PRO.id=DE.id_provincia`,
      [id_empleado],
      (err: AnyType, results: AnyType) => {
        if (results?.length === 0) {
          res.status(400).send({ message: errorData })
        } else {
          res.status(200).send({ data: deleteNull(results) })
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.registerDirecciones = async (req: Request, res: Response) => {
  const {
    id_empleado,
    id_pais,
    id_provincia,
    calle,
    no_casa,
    info_adicional,
    usuario_insercion,
  } = await new Direcciones(req.body.condition)
  conexion.query(
    'INSERT INTO direcciones_empleados SET ?',
    {
      id_empleado: id_empleado,
      id_pais: id_pais,
      id_provincia: id_provincia,
      calle: calle,
      no_casa: no_casa,
      info_adicional: info_adicional,
      usuario_insercion: usuario_insercion,
      fecha_insercion: new Date(),
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Dirección',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Dirección registrada con éxito' })
      }
    }
  )
}
exports.updateDirecciones = async (req: Request, res: Response) => {
  const {
    id,
    id_empleado,
    id_pais,
    id_provincia,
    calle,
    no_casa,
    info_adicional,
    estado,
    principal,
    usuario_insercion,
  } = await new Direcciones(req.body.condition)

  conexion.query(
    'UPDATE direcciones_empleados SET id_empleado = ?,principal = ?, id_pais = ?, id_provincia = ?, calle = ?, no_casa = ?,info_adicional = ?,estado=?,usuario_insercion=?,fecha_insercion=? WHERE id = ?',
    [
      id_empleado,
      principal,
      id_pais,
      id_provincia,
      calle,
      no_casa,
      info_adicional,
      estado,
      usuario_insercion,
      new Date(),
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando direccion',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Dirección Actualizada con exito' })
      }
    }
  )
}
exports.getTelefono = async (req: Request, res: Response) => {
  try {
    const { id_empleado } = await new Contacto_Emergencia(req.body.condition)

    conexion.query(
      `SELECT T.*,TT.tipo_telefono FROM telefonos T,tipos_telefono TT WHERE id_empleado = ? AND T.id_tipo_telefono = TT.id`,
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
exports.registerTelefono = async (req: Request, res: Response) => {
  const { id_empleado, telefono, id_tipo_telefono, usuario_insercion } =
    await new Contacto_Emergencia(req.body.condition)
  conexion.query(
    'INSERT INTO telefonos SET ?',
    {
      id_empleado: id_empleado,
      telefono: telefono,
      id_tipo_telefono: id_tipo_telefono,
      usuario_insercion: usuario_insercion,
      fecha_insercion: new Date(),
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Teléfono',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Teléfono registrado con exito' })
      }
    }
  )
}
exports.updateTelefono = async (req: Request, res: Response) => {
  const {
    id,
    id_empleado,
    telefono,
    estado,
    id_tipo_telefono,
    usuario_insercion,
    principal,
  } = await new Contacto_Emergencia(req.body.condition)
  if (principal === 1) {
    await conexion.query(
      `SELECT * FROM telefonos WHERE id_empleado = ? AND principal = ?`,
      [id_empleado, 1],
      async (err: AnyType, results: AnyType) => {
        await results?.forEach((element: AnyType) => {
          conexion.query('UPDATE telefonos SET principal = ? WHERE id = ?', [
            0,
            element.id,
          ])
        })
        await conexion.query(
          'UPDATE telefonos SET id_empleado = ?,principal = ?, telefono = ?,id_tipo_telefono = ?,estado = ?,usuario_insercion=?,fecha_insercion=? WHERE id = ?',
          [
            id_empleado,
            principal,
            telefono,
            id_tipo_telefono,
            estado,
            usuario_insercion,
            new Date(),
            id,
          ],
          (err: AnyType, results: Response) => {
            if (!results) {
              res.status(400).send({
                message: 'Error Actualizando Telefono',
                error: err?.sqlMessage,
              })
            } else {
              res
                .status(200)
                .send({ message: 'Telefono Actualizado con exito' })
            }
          }
        )
      }
    )
  } else {
    conexion.query(
      'UPDATE telefonos SET id_empleado = ?,principal = ?, telefono = ?,id_tipo_telefono = ?,estado = ?,usuario_insercion=?,fecha_insercion=? WHERE id = ?',
      [
        id_empleado,
        principal,
        telefono,
        id_tipo_telefono,
        estado,
        usuario_insercion,
        new Date(),
        id,
      ],
      (err: AnyType, results: Response) => {
        if (!results) {
          res.status(400).send({
            message: 'Error Actualizando Telefono',
            error: err?.sqlMessage,
          })
        } else {
          res.status(200).send({ message: 'Telefono Actualizado con exito' })
        }
      }
    )
  }
}
exports.getVacantes = async (req: Request, res: Response) => {
  try {
    const { id_empleado } = await new Contacto_Emergencia(req.body.condition)

    conexion.query(
      `SELECT V.*,(SELECT COUNT(C.estado) FROM candidatos C WHERE C.id_vacante = V.id) candidatos FROM vacantes V`,
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
exports.registerVacantes = async (req: Request, res: Response) => {
  const {
    nombre,
    puesto,
    correo_contacto,
    descripcion,
    usuario_insercion,
    cantidad_maxima,
    fecha_limite,
    id_departamento,
  } = await new vacantes(req.body.condition)
  conexion.query(
    'INSERT INTO vacantes SET ?',
    {
      nombre: nombre,
      puesto: puesto,
      correo_contacto: correo_contacto,
      descripcion: descripcion,
      usuario_insercion: usuario_insercion,
      fecha_insercion: new Date(),
      cantidad_maxima: cantidad_maxima,
      fecha_limite: fecha_limite,
      id_departamento: id_departamento,
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Vacante',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Vacante registrado con exito' })
      }
    }
  )
}
exports.updateVacantes = async (req: Request, res: Response) => {
  const {
    id,
    nombre,
    puesto,
    correo_contacto,
    descripcion,
    estado_publicacion,
    usuario_insercion,
    estado,
    cantidad_maxima,
    fecha_limite,
    id_departamento,
  } = await new vacantes(req.body.condition)

  conexion.query(
    'UPDATE vacantes SET nombre = ?,cantidad_maxima = ?,fecha_limite = ?,id_departamento = ?,puesto = ?,correo_contacto = ?,descripcion = ?,estado_publicacion = ?,usuario_insercion = ?,fecha_insercion = ?, estado = ? WHERE id = ?',
    [
      nombre,
      cantidad_maxima,
      fecha_limite,
      id_departamento,
      puesto,
      correo_contacto,
      descripcion,
      estado_publicacion,
      usuario_insercion,
      new Date(),
      estado,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Vacante',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Vacante Actualizado con exito' })
      }
    }
  )
}
exports.getEmails = async (req: Request, res: Response) => {
  try {
    const { id_empleado } = await new Contacto_Emergencia(req.body.condition)

    conexion.query(
      `SELECT * FROM correos_electronicos WHERE id_empleado = ?`,
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
exports.registerEmail = async (req: Request, res: Response) => {
  const { id_empleado, correo_electronico, usuario_insercion } =
    await new Contacto_Emergencia(req.body.condition)
  conexion.query(
    'INSERT INTO correos_electronicos SET ?',
    {
      id_empleado: id_empleado,
      correo_electronico: correo_electronico,
      fecha_insercion: new Date(),
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Correo Electrónico',
          error: err?.sqlMessage,
        })
      } else {
        res
          .status(200)
          .send({ message: 'Correo Electrónico registrado con exito' })
      }
    }
  )
}
exports.updateEmail = async (req: Request, res: Response) => {
  const {
    id,
    id_empleado,
    principal,
    correo_electronico,
    estado,
    usuario_insercion,
  } = await new Contacto_Emergencia(req.body.condition)
  if (principal === 1) {
    await conexion.query(
      `SELECT * FROM correos_electronicos WHERE id_empleado = ? AND principal = ?`,
      [id_empleado, 1],
      async (err: AnyType, results: AnyType) => {
        await results?.forEach((element: AnyType) => {
          conexion.query(
            'UPDATE correos_electronicos SET principal = ? WHERE id = ?',
            [0, element.id]
          )
        })
        await conexion.query(
          'UPDATE correos_electronicos SET id_empleado = ?,principal = ?, correo_electronico = ?, estado = ?,usuario_insercion=?,fecha_insercion=? WHERE id = ?',
          [
            id_empleado,
            principal,
            correo_electronico,
            estado,
            usuario_insercion,
            new Date(),
            id,
          ],
          (err: AnyType, results: Response) => {
            if (!results) {
              res.status(400).send({
                message: 'Error Actualizando Correo Electronico',
                error: err?.sqlMessage,
              })
            } else {
              res
                .status(200)
                .send({ message: 'Correo Electronico Actualizado con exito' })
            }
          }
        )
      }
    )
  } else {
    conexion.query(
      'UPDATE correos_electronicos SET id_empleado = ?,principal = ?, correo_electronico = ?, estado = ?,usuario_insercion=?,fecha_insercion=? WHERE id = ?',
      [
        id_empleado,
        principal,
        correo_electronico,
        estado,
        usuario_insercion,
        new Date(),
        id,
      ],
      (err: AnyType, results: Response) => {
        if (!results) {
          res.status(400).send({
            message: 'Error Actualizando Correo Electronico',
            error: err?.sqlMessage,
          })
        } else {
          res
            .status(200)
            .send({ message: 'Correo Electronico Actualizado con exito' })
        }
      }
    )
  }
}
exports.getDocumentosEmpleados = async (req: Request, res: Response) => {
  try {
    const { id_empleado } = await new Contacto_Emergencia(req.body.condition)

    conexion.query(
      `SELECT DE.*,TD.descripcion FROM documentos_empleados DE,tipo_documentos TD WHERE id_empleado = ? AND DE.id_tipo_documento = TD.id`,
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
exports.registerDocumentosEmpleados = async (req: Request, res: Response) => {
  const { id_empleado, id_tipo_documento, documento, usuario_insercion } =
    await new Contacto_Emergencia(req.body.condition)
  conexion.query(
    'INSERT INTO documentos_empleados SET ?',
    {
      id_empleado: id_empleado,
      id_tipo_documento: id_tipo_documento,
      documento: documento,
      fecha_insercion: new Date(),
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Documento',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Documento registrado con exito' })
      }
    }
  )
}
exports.updateDocumentosEmpleados = async (req: Request, res: Response) => {
  const {
    id,
    id_empleado,
    id_tipo_documento,
    documento,
    usuario_insercion,
    estado,
  } = await new Contacto_Emergencia(req.body.condition)
  conexion.query(
    'UPDATE documentos_empleados SET id_empleado = ?,id_tipo_documento = ?, documento = ?, estado = ?,usuario_insercion=?,fecha_insercion=? WHERE id = ?',
    [
      id_empleado,
      id_tipo_documento,
      documento,
      estado,
      usuario_insercion,
      new Date(),
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Documento',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Documento Actualizado con exito' })
      }
    }
  )
}

exports.getDatosAcademicos = async (req: Request, res: Response) => {
  const { id_empleado, estado } = await new Empleado(req.body.condition)
  conexion.query(
    estado
      ? `SELECT info_academica.id,info_academica.institucion,info_academica.id_nivel_academico,info_academica.fecha_finalizacion,info_academica.institucion,info_academica.estado,info_academica.observaciones,nivel_academico.nivel_academico 
    FROM info_academica INNER JOIN nivel_academico 
    ON info_academica.id_nivel_academico = nivel_academico.id 
    WHERE info_academica.id_empleado =? AND info_academica.estado =?`
      : `SELECT info_academica.id,info_academica.institucion,info_academica.id_nivel_academico,info_academica.fecha_finalizacion,info_academica.institucion,info_academica.estado,info_academica.observaciones,nivel_academico.nivel_academico 
    FROM info_academica INNER JOIN nivel_academico 
    ON info_academica.id_nivel_academico = nivel_academico.id 
    WHERE info_academica.id_empleado =? `,
    [id_empleado, estado],
    (err: AnyType, results: AnyType) => {
      if (results?.length === 0) {
        res.status(400).send({ message: errorData })
      } else {
        res.status(200).send({ data: results })
      }
    }
  )
}
exports.updateDatosAcademicos = async (req: Request, res: Response) => {
  const {
    id_nivel_academico,
    institucion,
    fecha_finalizacion,
    observaciones,
    estado,
    usuario_insercion,
    id,
  } = await new Info_Academica(req.body.condition)

  conexion.query(
    'UPDATE info_academica SET id_nivel_academico = ?,institucion = ?,fecha_finalizacion = ?, observaciones = ?,usuario_insercion=?, estado = ?,fecha_insercion=? WHERE id = ?',
    [
      id_nivel_academico,
      institucion,
      fecha_finalizacion,
      observaciones,
      usuario_insercion,
      estado,
      new Date(),
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Info Académica',
          error: err?.sqlMessage,
        })
      } else {
        res
          .status(200)
          .send({ message: ' Info Académica Actualizada con exito' })
      }
    }
  )
}
exports.updateDatosEmpleo = async (req: Request, res: Response) => {
  const {
    id_departamento,
    id_jornada_trabajo,
    id_cargo,
    sueldo,
    id,
    id_tipo_nomina,
    fecha_contratacion,
    honorifico,
    usuario_insercion,
  } = await new Empleados(req.body.condition)
  conexion.query(
    'UPDATE empleados SET id_departamento = ?,id_jornada_trabajo = ?,id_cargo = ?, sueldo = ?, fecha_contratacion = ?,id_tipo_nomina = ?,honorifico = ?,usuario_insercion=?,fecha_insercion=? WHERE id = ?',
    [
      id_departamento,
      id_jornada_trabajo,
      id_cargo,
      sueldo,
      fecha_contratacion,
      id_tipo_nomina,
      honorifico,
      usuario_insercion,
      new Date(),
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Datos del Empleo',
          error: err?.sqlMessage,
        })
      } else {
        res
          .status(200)
          .send({ message: 'Datos del Empleo Actualizada con exito' })

        conexion.query(
          `SELECT * FROM descuentos_fijos WHERE id_empleado=? ORDER BY id DESC LIMIT 1`,
          [id],
          (err: AnyType, results: AnyType) => {
            if (results?.length === 0) {
              const datos_nomina = nomina(sueldo)
              conexion.query('INSERT INTO descuentos_fijos SET ?', {
                id_tipo_nomina: id_tipo_nomina,
                id_empleado: id,
                sueldo_bruto: datos_nomina?.sueldoBruto,
                sueldo_neto: datos_nomina?.sueldo_neto,
                sueldo_anual: datos_nomina?.sueldoAnual,
                ISR: datos_nomina?.isr,
                AFP: datos_nomina?.afp,
                SFS: datos_nomina?.sfs,
                total_descuento: datos_nomina?.total_descuento,
                fecha_insercion: new Date(),
                usuario_insercion: usuario_insercion,
              })
              console.log('Nomina Generada')
            }
          }
        )
      }
    }
  )
}
exports.updateDepartamento = async (req: Request, res: Response) => {
  const { id_departamento, id, usuario_insercion } = await new Empleados(
    req.body.condition
  )
  conexion.query(
    'UPDATE empleados SET id_departamento = ?,fecha_insercion = ?,usuario_insercion = ? WHERE id = ?',
    [id_departamento, new Date(), usuario_insercion, id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Departamento',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Departamento Actualizado con exito' })
      }
    }
  )
}

exports.registerInfoAcademica = async (req: Request, res: Response) => {
  const {
    id_nivel_academico,
    institucion,
    fecha_finalizacion,
    observaciones,
    id_empleado,
    usuario_insercion,
  } = await new Info_Academica(req.body.condition)

  conexion.query(
    'INSERT INTO info_academica SET ?',
    {
      id_empleado: id_empleado,
      id_nivel_academico: id_nivel_academico,
      institucion: institucion,
      fecha_finalizacion: fecha_finalizacion,
      observaciones: observaciones,
      fecha_insercion: new Date(),
      usuario_insercion: usuario_insercion,
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Informacion Academica',
          error: err?.sqlMessage,
        })
      } else {
        res
          .status(200)
          .send({ message: 'Informacion Academica registrando con exito' })
      }
    }
  )
}
