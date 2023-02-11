import { Request, Response } from 'express'
import fetch from 'node-fetch'
import { DbError, unirArrayEnObjeto } from '../constants/general'
import { Personas, provincias, parametros, Consultas } from '../entity/general'
const conexion = require('../database/db')
import { errorData } from '../constants/general'
import { Empresa } from '../entity/auth'
export type AnyType<T = any> = T

exports.getPersonas = async (req: Request, res: Response) => {
  const { doc_identidad } = await new Personas(req.body.condition)
  try {
    const response = await fetch(process.env.GET_PERSON_DATA + doc_identidad)
    const { data } = await response.json()
    if (data) {
      res.status(200).send({ data })
    } else {
      res.status(400).send(DbError('Persona no encontrada'))
    }
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.getPersona = async (req: Request, res: Response) => {
  const { doc_identidad } = await new Personas(req.body.condition)
  conexion.query(
    'SELECT * FROM empleados where doc_identidad = ?',
    [doc_identidad],
    (err: AnyType, results: AnyType) => {
      if (results?.length === 0) {
        res.status(400).send({ message: errorData })
      } else {
        res.status(200).send({ message: 'Existe una persona' })
      }
    }
  )
}

exports.getCivilState = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM estado_civil',
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
exports.getNivelAcademico = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM nivel_academico',
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
exports.getNomina = async (req: Request, res: Response) => {
  try {
    conexion.query('SELECT * FROM nomina', (err: AnyType, results: AnyType) => {
      if (results?.length === 0) {
        res.status(400).send({ message: errorData })
      } else {
        res.status(200).send({ data: results })
      }
    })
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.getTipoDocumentos = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM tipo_documentos',
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

exports.getInfoEmpresa = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM empresa',
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
exports.getCargo = async (req: Request, res: Response) => {
  try {
    conexion.query('SELECT * FROM cargos', (err: AnyType, results: AnyType) => {
      if (results?.length === 0) {
        res.status(400).send({ message: errorData })
      } else {
        res.status(200).send({ data: results })
      }
    })
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.getBloodType = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM tipos_sangre',
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
exports.getParentesco = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM parentesco',
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
exports.getTipoTelefono = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM tipos_telefono',
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
    conexion.query('SELECT * FROM paises', (err: AnyType, results: AnyType) => {
      if (results?.length === 0) {
        res.status(400).send({ message: errorData })
      } else {
        res.status(200).send({ data: results })
      }
    })
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}

exports.getProvincias = async (req: Request, res: Response) => {
  const { id_pais } = await new provincias(req.body.condition)

  try {
    conexion.query(
      id_pais === undefined
        ? `SELECT * FROM provincias`
        : `SELECT * FROM provincias WHERE id_pais = ?`,
      [id_pais],
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

exports.getParametros = async (req: Request, res: Response) => {
  const { id_actividad } = await new parametros(req.body.condition)

  try {
    conexion.query(
      `SELECT * FROM parametros WHERE id_actividad = ? `,
      [id_actividad],
      (err: AnyType, results: AnyType) => {
        if (results?.length === 0) {
          res.status(400).send({ message: errorData })
        } else {
          let ArrayParametros = results.map((item: any) => {
            return { [item.parametro]: item.valor }
          }, [])
          res.status(200).send({
            data: unirArrayEnObjeto(ArrayParametros),
          })
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
