import { Request, Response } from 'express'
import {
  Consultas,
  Doctor,
  Especialidades,
  Horarios,
  Paciente,
} from '../entity/general'
const conexion = require('../database/db')
import { errorData } from '../constants/general'
import { deleteKeys } from '../helpers/general'
import { Det_citas, Empleados } from '../entity/auth'
import { cryptr } from './authController'
export type AnyType<T = any> = T
// const bcryptjs = require('bcryptjs')
exports.getConsultas = async (req: Request, res: Response) => {
  const { id_paciente, id_doctor, estado } = await new Consultas(
    req.body.condition
  )
  try {
    const id = id_paciente !== undefined ? id_paciente : id_doctor
    const query =
      estado === 'H'
        ? id_paciente !== undefined
          ? 'SELECT C.*,P.nombres nombre_paciente,P.apellidos apellido_paciente,D.nombre nombre_doctor,D.apellido apellido_doctor FROM citas C,pacientes P,doctores D WHERE C.id_paciente = P.id AND C.id_doctor = D.id AND C.id_paciente = ?'
          : id_doctor !== undefined
          ? 'SELECT C.*,P.nombres nombre_paciente,P.apellidos apellido_paciente,D.nombre nombre_doctor,D.apellido apellido_doctor FROM citas C,pacientes P,doctores D WHERE C.id_paciente = P.id AND C.id_doctor = D.id AND C.id_doctor = ?'
          : 'SELECT C.*,P.nombres nombre_paciente,P.apellidos apellido_paciente,D.nombre nombre_doctor,D.apellido apellido_doctor FROM citas C,pacientes P,doctores D WHERE C.id_paciente = P.id AND C.id_doctor = D.id'
        : estado === 'T'
        ? id_paciente !== undefined
          ? 'SELECT C.*,P.nombres nombre_paciente,P.apellidos apellido_paciente,D.nombre nombre_doctor,D.apellido apellido_doctor FROM citas C,pacientes P,doctores D WHERE C.id_paciente = P.id AND C.id_doctor = D.id AND C.id_paciente = ? AND C.estado = "T"'
          : id_doctor !== undefined
          ? 'SELECT C.*,P.nombres nombre_paciente,P.apellidos apellido_paciente,D.nombre nombre_doctor,D.apellido apellido_doctor FROM citas C,pacientes P,doctores D WHERE C.id_paciente = P.id AND C.id_doctor = D.id AND C.id_doctor = ? AND C.estado = "T"'
          : 'SELECT C.*,P.nombres nombre_paciente,P.apellidos apellido_paciente,D.nombre nombre_doctor,D.apellido apellido_doctor,D.id_especialidad FROM citas C,pacientes P,doctores D WHERE C.id_paciente = P.id AND C.id_doctor = D.id AND C.estado = "T"'
        : id_paciente !== undefined
        ? 'SELECT C.*,P.nombres nombre_paciente,P.apellidos apellido_paciente,D.nombre nombre_doctor,D.apellido apellido_doctor FROM citas C,pacientes P,doctores D WHERE C.id_paciente = P.id AND C.id_doctor = D.id AND C.id_paciente = ? AND C.estado <> "T"'
        : id_doctor !== undefined
        ? 'SELECT C.*,P.nombres nombre_paciente,P.apellidos apellido_paciente,D.nombre nombre_doctor,D.apellido apellido_doctor FROM citas C,pacientes P,doctores D WHERE C.id_paciente = P.id AND C.id_doctor = D.id AND C.id_doctor = ? AND C.estado <> "T"'
        : 'SELECT C.*,P.nombres nombre_paciente,P.apellidos apellido_paciente,D.nombre nombre_doctor,D.apellido apellido_doctor FROM citas C,pacientes P,doctores D WHERE C.id_paciente = P.id AND C.id_doctor = D.id AND C.estado <> "T"'

    conexion.query(query, [id], (err: AnyType, results: AnyType) => {
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
exports.registerConsultas = async (req: Request, res: Response) => {
  const { id_paciente, id_doctor, asunto, id_tanda, dia } = await new Consultas(
    req.body.condition
  )
  conexion.query(
    'INSERT INTO citas SET ?',
    {
      id_paciente,
      id_doctor,
      asunto,
      id_tanda,
      dia,
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
  const { id, id_paciente, id_doctor, asunto, estado, receta, id_tanda, dia } =
    await new Consultas(req.body.condition)

  conexion.query(
    'UPDATE citas SET id_paciente = ?,id_doctor = ?, asunto = ?, id_tanda = ?, dia = ?, fecha_insercion = ?, estado = ?,receta = ? WHERE id = ?',
    [
      id_paciente,
      id_doctor,
      asunto,
      id_tanda,
      dia,
      new Date(),
      estado,
      receta,
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
          const data = results?.map((item: AnyType) => {
            return {
              ...item,
              clave: cryptr.decrypt(item.clave),
            }
          })
          res.status(200).send({
            data,
          })
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
      clave: cryptr.encrypt(clave),
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
exports.getAdministradores = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM administradores',
      (err: AnyType, results: AnyType) => {
        if (results?.length === 0) {
          res.status(400).send({ message: errorData })
        } else {
          const data = results?.map((item: AnyType) => {
            return {
              ...item,
              clave: cryptr.decrypt(item.clave),
            }
          })
          res.status(200).send({
            data,
          })
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.registerAdministradores = async (req: Request, res: Response) => {
  const {
    cedula,
    nombres,
    apellidos,
    // fecha_nacimiento,
    // id_seguro,
    // id_nacionalidad,
    // telefono,
    sexo,
    // email,
    clave,
    imagen,
  } = await new Empleados(req.body.condition)
  conexion.query(
    'INSERT INTO administradores SET ?',
    {
      cedula,
      nombres,
      apellidos,
      imagen,
      clave: cryptr.encrypt(clave),
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
exports.updateAdministradores = async (req: Request, res: Response) => {
  const { cedula, nombres, apellidos, imagen, estado, id } =
    await new Empleados(req.body.condition)

  conexion.query(
    'UPDATE administradores SET nombres = ?, apellidos = ?, cedula = ?,estado = ?,imagen = ? WHERE id = ?',
    [nombres, apellidos, cedula, estado, imagen, id],
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
exports.getDetCitas = async (req: Request, res: Response) => {
  try {
    const { id_cita } = await new Det_citas(req.body.condition)
    conexion.query(
      'SELECT DC.*,TL.nombre tipo_lesion,CL.color color FROM det_citas DC, tipo_lesion TL,color_lesion CL WHERE Dc.id_tipo_lesion = TL.id AND DC.id_color_lesion = CL.id AND DC.id_cita = ?',
      [id_cita],
      (err: AnyType, results: AnyType) => {
        if (results?.length === 0) {
          res.status(400).send({ message: errorData })
        } else {
          res.status(200).send({
            data: results?.[0],
          })
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.getTipoLesion = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM tipo_lesion',
      (err: AnyType, results: AnyType) => {
        if (results?.length === 0) {
          res.status(400).send({ message: errorData })
        } else {
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
exports.getColorLesion = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM color_lesion',
      (err: AnyType, results: AnyType) => {
        if (results?.length === 0) {
          res.status(400).send({ message: errorData })
        } else {
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
exports.registerDetCitas = async (req: Request, res: Response) => {
  const {
    id_cita,
    id_tipo_lesion,
    id_color_lesion,
    localizacion,
    antecedentes_patologicos,
    tratamiento_previo,
    lesiones_anteriores,
    fecha_lesion_anterior,
    detalles_extras,
  } = await new Det_citas(req.body.condition)
  conexion.query(
    'INSERT INTO det_citas SET ?',
    {
      id_cita,
      id_tipo_lesion,
      id_color_lesion,
      localizacion,
      antecedentes_patologicos,
      tratamiento_previo,
      lesiones_anteriores,
      fecha_lesion_anterior,
      detalles_extras,
      fecha_insercion: new Date(),
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Detalle de cita',
          error: err?.sqlMessage,
        })
      } else {
        res
          .status(200)
          .send({ message: 'Detalle de cita registrado con exito' })
      }
    }
  )
}
exports.updateDetCitas = async (req: Request, res: Response) => {
  const {
    id_cita,
    id_tipo_lesion,
    id_color_lesion,
    localizacion,
    antecedentes_patologicos,
    tratamiento_previo,
    lesiones_anteriores,
    fecha_lesion_anterior,
    detalles_extras,
    estado,
    id,
  } = await new Det_citas(req.body.condition)

  conexion.query(
    'UPDATE det_citas SET id_cita = ?, id_tipo_lesion = ?, id_color_lesion = ?,localizacion = ?,antecedentes_patologicos = ?,tratamiento_previo = ?,lesiones_anteriores = ?,fecha_lesion_anterior = ?,detalles_extras = ?,estado = ? WHERE id = ?',
    [
      id_cita,
      id_tipo_lesion,
      id_color_lesion,
      localizacion,
      antecedentes_patologicos,
      tratamiento_previo,
      lesiones_anteriores,
      fecha_lesion_anterior,
      detalles_extras,
      estado,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Detalle de cita',
          error: err?.sqlMessage,
        })
      } else {
        res
          .status(200)
          .send({ message: 'Detalle de cita Actualizado con exito' })
      }
    }
  )
}
exports.getDoctores = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT D.*,N.nombre nacionalidad,E.nombre especialidad FROM doctores D, nacionalidad N,especialidad E WHERE D.id_nacionalidad = N.id AND D.id_especialidad = E.id',
      (err: AnyType, results: AnyType) => {
        if (results?.length === 0) {
          res.status(400).send({ message: errorData })
        } else {
          const data = results?.map((item: AnyType) => {
            return {
              ...item,
              clave: cryptr.decrypt(item.clave),
            }
          })
          res.status(200).send({
            data,
          })
        }
      }
    )
  } catch (error: AnyType) {
    res.status(400).send({ message: error })
  }
}
exports.registerDoctor = async (req: Request, res: Response) => {
  const {
    cedula,
    nombre,
    apellido,
    fecha_nacimiento,
    id_especialidad,
    id_nacionalidad,
    telefono,
    sexo,
    exequatur,
    correo,
    clave,
    imagen,
  } = await new Doctor(req.body.condition)
  conexion.query(
    'INSERT INTO doctores SET ?',
    {
      cedula,
      nombre,
      apellido,
      fecha_nacimiento,
      id_especialidad,
      id_nacionalidad,
      imagen,
      exequatur,
      telefono,
      sexo,
      correo,
      clave: cryptr.encrypt(clave),
      fecha_insercion: new Date(),
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Doctor',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Doctor registrado con exito' })
      }
    }
  )
}
exports.updateDoctor = async (req: Request, res: Response) => {
  const {
    cedula,
    nombre,
    apellido,
    fecha_nacimiento,
    id_especialidad,
    id_nacionalidad,
    telefono,
    sexo,
    imagen,
    exequatur,
    correo,
    estado,
    id,
  } = await new Doctor(req.body.condition)

  conexion.query(
    'UPDATE doctores SET cedula = ?,nombre = ?, apellido = ?, fecha_nacimiento = ?,exequatur = ?,id_especialidad = ?,id_nacionalidad = ?,telefono = ?, sexo = ?, correo = ?, estado = ?,imagen = ? WHERE id = ?',
    [
      cedula,
      nombre,
      apellido,
      new Date(fecha_nacimiento),
      exequatur,
      id_especialidad,
      id_nacionalidad,
      telefono,
      sexo,
      correo,
      estado,
      imagen,
      id,
    ],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Doctor',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Doctor Actualizado con exito' })
      }
    }
  )
}
exports.getEspecialidades = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM especialidad',
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
exports.registerEspecialidades = async (req: Request, res: Response) => {
  const { nombre } = await new Especialidades(req.body.condition)
  conexion.query(
    'INSERT INTO especialidad SET ?',
    {
      nombre,
      fecha_insercion: new Date(),
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Especialidad',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Especialidad registrada con exito' })
      }
    }
  )
}
exports.updateEspecialidades = async (req: Request, res: Response) => {
  const { nombre, estado, id } = await new Especialidades(req.body.condition)

  conexion.query(
    'UPDATE especialidad SET nombre = ?,estado = ? WHERE id = ?',
    [nombre, estado, id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Especialidad',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Especialidad Actualizada con exito' })
      }
    }
  )
}
exports.getHorarios = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT H.*,D.nombre nombre_doctor,D.apellido apellido_doctor FROM horarios H,doctores D WHERE H.id_doctor = D.id',
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
exports.registerHorarios = async (req: Request, res: Response) => {
  const { oficina, id_doctor, tanda_manana, tanda_tarde } = await new Horarios(
    req.body.condition
  )
  conexion.query(
    'INSERT INTO horarios SET ?',
    {
      oficina,
      id_doctor,
      tanda_manana,
      tanda_tarde,
      fecha_insercion: new Date(),
    },
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error registrando Horario',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Horario registrado con exito' })
      }
    }
  )
}
exports.updateHorarios = async (req: Request, res: Response) => {
  const { oficina, id_doctor, estado, id, tanda_manana, tanda_tarde } =
    await new Horarios(req.body.condition)

  conexion.query(
    'UPDATE horarios SET oficina = ?,tanda_manana = ?,tanda_tarde = ?, id_doctor = ?,estado = ? WHERE id = ?',
    [oficina, tanda_manana, tanda_tarde, id_doctor, estado, id],
    (err: AnyType, results: Response) => {
      if (!results) {
        res.status(400).send({
          message: 'Error Actualizando Horario',
          error: err?.sqlMessage,
        })
      } else {
        res.status(200).send({ message: 'Horario Actualizado con exito' })
      }
    }
  )
}

exports.getNacionalidades = async (req: Request, res: Response) => {
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
exports.getSeguros = async (req: Request, res: Response) => {
  try {
    conexion.query(
      'SELECT * FROM seguros',
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
