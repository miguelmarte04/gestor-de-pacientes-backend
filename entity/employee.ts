import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity('EMPLEADOS')
export class Empleados extends BaseEntity<Empleados> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', length: 100, nullable: true })
  nombres: string
  @Column({ type: 'number', nullable: true })
  id_nomina: number
  @Column({ type: 'varchar2', length: 100, nullable: true })
  tipo: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  accion: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  apellidos: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  apodo: string
  @Column({ type: 'varchar2', length: 13, nullable: true })
  doc_identidad: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  tipo_doc_identidad: string
  @Column({ type: 'text', nullable: true })
  imagen: string
  @Column({ type: 'varchar2', length: 11, nullable: true })
  tipo_sangre: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  estado_civil: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  direccion: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  fecha_nacimiento: string
  @Column({ type: 'date', length: 100, nullable: true })
  sexo: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  telefono: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  correo_electronico: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  celular: string
  @Column({ type: 'number', length: 100, nullable: true })
  sueldo: number
  @Column({ type: 'varchar2', length: 100, nullable: true })
  puesto: string
  @Column({ type: 'number', length: 100, nullable: true })
  id_tipo_pago: number
  @Column({ type: 'varchar2', length: 100, nullable: true })
  numero_cuenta_electronica: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  honorifico: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  nomina: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  departamento: string
  @Column({ type: 'char', length: 1, nullable: true })
  estado: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  lugar_nacimiento: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  usuario: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  privilegios: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  search: string
  @Column({ type: 'number', nullable: true })
  id_cargo: number
  @Column({ type: 'number', nullable: true })
  id_departamento: number
  @Column({ type: 'number', nullable: true })
  id_tipo_nomina: number
  @Column({ type: 'number', nullable: true })
  id_estado_civil: number
  @Column({ type: 'number', nullable: true })
  id_jornada_trabajo: number

  @Column({ type: 'number', nullable: true })
  id_pais: number
  @Column({ type: 'number', nullable: true })
  id_tipo_sangre: number
  @Column({ type: 'date', nullable: true })
  fecha_contratacion: Date
}
@Entity('DESPIDOS')
export class Despidos extends BaseEntity<Despidos> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: true })
  id_empleado: number
  @Column({ type: 'number', nullable: true })
  id_tipo_razon_despido: number
  @Column({ type: 'number', nullable: true })
  preaviso: number
  @Column({ type: 'number', nullable: true })
  regalia: number
  @Column({ type: 'number', nullable: true })
  cesantia: number
  @Column({ type: 'number', nullable: true })
  total_prestaciones: number
  @Column({ type: 'varchar', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar', nullable: true })
  observaciones: string
  @Column({ type: 'date', nullable: true })
  fecha_insercion: Date
  @Column({ type: 'varchar', nullable: true })
  estado: string
}
@Entity('AUMENTO_SUELDO')
export class AumentoSueldo extends BaseEntity<AumentoSueldo> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: true })
  id_empleado: number
  @Column({ type: 'number', nullable: true })
  anterior_sueldo: number
  @Column({ type: 'number', nullable: true })
  nuevo_sueldo: number
  @Column({ type: 'varchar', nullable: true })
  observaciones: string
  @Column({ type: 'varchar', nullable: true })
  usuario_insercion: string
  @Column({ type: 'date', nullable: true })
  fecha_insercion: Date
  @Column({ type: 'varchar', nullable: true })
  estado: string
}
@Entity('RENUNCIAS')
export class Renuncias extends BaseEntity<Renuncias> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: true })
  id_empleado: number
  @Column({ type: 'number', nullable: true })
  id_tipo_razon_renuncia: number

  @Column({ type: 'number', nullable: true })
  regalia: number
  @Column({ type: 'number', nullable: true })
  sueldo_vacaciones: number
  @Column({ type: 'number', nullable: true })
  total_prestaciones: number
  @Column({ type: 'varchar', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar', nullable: true })
  observaciones: string
  @Column({ type: 'varchar', nullable: true })
  imagen: string
  @Column({ type: 'date', nullable: true })
  fecha_insercion: Date
  @Column({ type: 'varchar', nullable: true })
  estado: string
}
@Entity('NOMINAS')
export class Nominas extends BaseEntity<Nominas> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: true })
  id_tipo_nomina: number
  @Column({ type: 'number', nullable: true })
  id_banco: number
  @Column({ type: 'number', nullable: true })
  id_nomina: number
  @Column({ type: 'number', nullable: true })
  id_empleado: number
  @Column({ type: 'number', nullable: true })
  salario_bruto: number
  @Column({ type: 'date', nullable: true })
  fecha_insercion: Date
  @Column({ type: 'date', nullable: true })
  fecha_registro: Date
  @Column({ type: 'varchar', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar', nullable: true })
  estado_nomina: string
  @Column({ type: 'varchar', nullable: true })
  descripcion: string
  @Column({ type: 'varchar', nullable: true })
  estado: string
}
@Entity('DESCUENTOS')
export class Descuentos extends BaseEntity<Descuentos> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: true })
  id_nomina: number
  @Column({ type: 'number', nullable: true })
  id_empleado: number
  @Column({ type: 'varchar', nullable: true })
  nombre: string
  @Column({ type: 'number', nullable: true })
  monto: number
  @Column({ type: 'varchar', nullable: true })
  descripcion: string
  @Column({ type: 'varchar', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar', nullable: true })
  estado: string
}
@Entity('INGRESOS')
export class Ingresos extends BaseEntity<Ingresos> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: true })
  id_nomina: number
  @Column({ type: 'number', nullable: true })
  id_empleado: number
  @Column({ type: 'varchar', nullable: true })
  nombre: string
  @Column({ type: 'number', nullable: true })
  monto: number
  @Column({ type: 'varchar', nullable: true })
  descripcion: string
  @Column({ type: 'varchar', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar', nullable: true })
  estado: string
}
@Entity('SOLICITUD_VACACIONES')
export class Solicitud_Vacaciones extends BaseEntity<Solicitud_Vacaciones> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: true })
  id_empleado: number
  @Column({ type: 'varchar', nullable: true })
  fecha_inicio: string
  @Column({ type: 'varchar', nullable: true })
  fecha_fin: string
  @Column({ type: 'varchar', nullable: true })
  fecha_insercion: string
  @Column({ type: 'varchar', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar', nullable: true })
  estado_solicitud: string
  @Column({ type: 'varchar', nullable: true })
  estado: string
}
@Entity('ABSENCE')
export class Absence extends BaseEntity<Absence> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', length: 100, nullable: true })
  id_empleado: number
  @Column({ type: 'number', length: 100, nullable: true })
  id_tipo_ausencia: number
  @Column({ type: 'date', length: 100, nullable: true })
  fecha: string
  @Column({ type: 'text', length: 200, nullable: true })
  observacion: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('DISCOUNT')
export class Discount extends BaseEntity<Discount> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', length: 100, nullable: true })
  id_empleado: number
  @Column({ type: 'number', length: 100, nullable: true })
  id_descripcion_descuento: number
  @Column({ type: 'date', length: 100, nullable: true })
  fecha_inicio: string
  @Column({ type: 'text', length: 200, nullable: true })
  fecha_vence: string
  @Column({ type: 'number', length: 100, nullable: true })
  empleado: number
  @Column({ type: 'number', length: 100, nullable: true })
  institucion: number
  @Column({ type: 'number', length: 100, nullable: true })
  pendiente: number
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}

@Entity('TIMEDELAY')
export class TimeDelay extends BaseEntity<TimeDelay> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', length: 100, nullable: true })
  id_empleado: number
  @Column({ type: 'date', length: 100, nullable: true })
  fecha: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  motivo: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  hora_llegada: string
  @Column({ type: 'text', length: 200, nullable: true })
  observacion: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('HOLIDAYS')
export class Holidays extends BaseEntity<Holidays> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', length: 100, nullable: true })
  id_empleado: number
  @Column({ type: 'date', length: 100, nullable: true })
  fecha_inicio: string
  @Column({ type: 'date', length: 100, nullable: true })
  fecha_fin: string
  @Column({ type: 'date', length: 100, nullable: true })
  fecha_insercion: string
  @Column({ type: 'text', length: 200, nullable: true })
  observacion: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('GROUPESANGUIN')
export class GroupeSanguin extends BaseEntity<GroupeSanguin> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', nullable: true })
  tipo_sangre: string
  @Column({ type: 'varchar2', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('POSITION')
export class Position extends BaseEntity<Position> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: true })
  id_departamento: number
  @Column({ type: 'varchar2', nullable: true })
  cargo: string
  @Column({ type: 'number', nullable: true })
  sueldo_minimo: number
  @Column({ type: 'number', nullable: true })
  sueldo_maximo: number
  @Column({ type: 'number', nullable: true })
  fecha_insercion: string
  @Column({ type: 'varchar2', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('CONFIGURACIONES')
export class Configuracion extends BaseEntity<Configuracion> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', nullable: true })
  descripcion: string
  @Column({ type: 'varchar2', nullable: true })
  fecha_insercion: string
  @Column({ type: 'varchar2', nullable: true })
  tipo: string
  @Column({ type: 'varchar2', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('WORKINGDAYS')
export class WorkingDay extends BaseEntity<WorkingDay> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', length: 1, nullable: true })
  jornada_trabajo: string
  @Column({ type: 'varchar2', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('RELATIONSHIP')
export class RelationShip extends BaseEntity<RelationShip> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', length: 1, nullable: true })
  parentesco: string
  @Column({ type: 'varchar2', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('TIPO_NOMINA')
export class TipoNomina extends BaseEntity<TipoNomina> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', length: 1, nullable: true })
  tipo_nomina: string
  @Column({ type: 'varchar2', nullable: true })
  descuentos_fijos: string
  @Column({ type: 'varchar2', nullable: true })
  descuentos_empleado: string
  @Column({ type: 'varchar2', nullable: true })
  ingresos_empleados: string
  @Column({ type: 'varchar2', nullable: true })
  fecha_insercion: string
  @Column({ type: 'varchar2', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('PHONE')
export class Phone extends BaseEntity<Phone> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', length: 1, nullable: true })
  tipo_telefono: string
  @Column({ type: 'varchar2', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('EMAIL')
export class Email extends BaseEntity<Email> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', length: 1, nullable: true })
  tipo_correo_electronico: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('PERMISSIONS')
export class Permissions extends BaseEntity<Permissions> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', length: 100, nullable: true })
  id_empleado: number
  @Column({ type: 'number', length: 100, nullable: true })
  id_tipo_permiso: number
  @Column({ type: 'number', length: 100, nullable: true })
  id_tipo_licencia: number
  @Column({ type: 'number', length: 100, nullable: true })
  id_tipo_falta: number
  @Column({ type: 'date', length: 100, nullable: true })
  fecha_inicio: string
  @Column({ type: 'date', length: 100, nullable: true })
  fecha_fin: string
  @Column({ type: 'text', nullable: true })
  imagenes: string
  @Column({ type: 'text', length: 200, nullable: true })
  observaciones: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('TYPEABSENCE')
export class TypeAbsence extends BaseEntity<TypeAbsence> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', length: 100, nullable: true })
  tipo_ausencia: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('TYPEPERMISSION')
export class TypePermissions extends BaseEntity<TypePermissions> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', length: 100, nullable: true })
  tipo_permiso: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('PARAMETERS')
export class Parameters extends BaseEntity<Parameters> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', length: 100, nullable: true })
  id_actividad: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  parametro: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  valor: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('BUSINESS')
export class Business extends BaseEntity<Business> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', length: 100, nullable: true })
  nombre_empresa: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  logo: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  background_color: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('PROVINCES')
export class Provinces extends BaseEntity<Provinces> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: true })
  id_pais: number
  @Column({ type: 'varchar2', length: 100, nullable: true })
  provincia: string
  @Column({ type: 'varchar2', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('INFOACADEMICA')
export class Info_Academica extends BaseEntity<Info_Academica> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: false })
  id_empleado: number
  @Column({ type: 'number', nullable: false })
  id_nivel_academico: number
  @Column({ type: 'varchar2', length: 100, nullable: true })
  institucion: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  usuario_insercion: string
  @Column({ type: 'date' })
  fecha_finalizacion: Date
  @Column({ type: 'varchar2', length: 200, nullable: true })
  observaciones: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('CONTACTOEMERGENCIA')
export class Contacto_Emergencia extends BaseEntity<Contacto_Emergencia> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: false })
  id_empleado: number
  @Column({ type: 'number', nullable: false })
  principal: number
  @Column({ type: 'number', nullable: false })
  id_parentesco: number
  @Column({ type: 'varchar2' })
  nombre: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  direccion: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  correo_electronico: string
  @Column({ type: 'varchar2', length: 10, nullable: true })
  telefono: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  documento: string
  @Column({ type: 'varchar2', nullable: true })
  fecha_insercion: string
  @Column({ type: 'number', length: 1, nullable: true })
  id_tipo_telefono: string
  @Column({ type: 'number', nullable: true })
  id_tipo_documento: number
}
@Entity('ASIGNARUSUARIO')
export class AsignarUsuario extends BaseEntity<AsignarUsuario> {
  @Column({ type: 'number', nullable: false })
  id_empleado: number
  @Column({ type: 'number', nullable: false })
  id_departamento: number
  @Column({ type: 'varchar2', length: 100, nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  pass: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  usuario: string
}
@Entity('CANDIDATOS')
export class candidatos extends BaseEntity<candidatos> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: false })
  id_vacante: number
  @Column({ type: 'varchar2', nullable: false })
  nombres: string
  @Column({ type: 'varchar2', nullable: false })
  apellidos: string
  @Column({ type: 'varchar2', nullable: false })
  nivel_academico: string
  @Column({ type: 'varchar2' })
  correo_electronico: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  telefono: string
  @Column({ type: 'blob' })
  curriculum: string
  @Column({ type: 'varchar2' })
  resumen: string
  @Column({ type: 'number' })
  experiencia: number
  @Column({ type: 'varchar2', nullable: true })
  fecha_insercion: string
  @Column({ type: 'varchar2', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', nullable: true })
  estado: string
}
@Entity('TIPODOCUMENTO')
export class tipoDocumento extends BaseEntity<tipoDocumento> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: false })
  descripcion: number
  @Column({ type: 'varchar2', nullable: true })
  fecha_insercion: string
  @Column({ type: 'varchar2', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', nullable: true })
  estado: string
}
@Entity('VACANTES')
export class vacantes extends BaseEntity<vacantes> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', nullable: false })
  nombre: string
  @Column({ type: 'varchar2', nullable: false })
  puesto: string
  @Column({ type: 'varchar2' })
  correo_contacto: string
  @Column({ type: 'number' })
  id_departamento: number
  @Column({ type: 'number' })
  cantidad_maxima: number
  @Column({ type: 'varchar2', length: 100, nullable: true })
  descripcion: string
  @Column({ type: 'varchar2' })
  estado_publicacion: string
  @Column({ type: 'varchar2', nullable: true })
  fecha_insercion: string
  @Column({ type: 'varchar2', nullable: true })
  fecha_limite: string
  @Column({ type: 'varchar2', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', nullable: true })
  estado: string
}
@Entity('VACACIONES')
export class Vacaciones extends BaseEntity<Vacaciones> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: false })
  id_empleado: number
  @Column({ type: 'datetime', nullable: true })
  fecha_inicio: string
  @Column({ type: 'datetime', nullable: true })
  fecha_fin: string
  @Column({ type: 'datetime', nullable: true })
  fecha_insercion: string
  @Column({ type: 'varchar2', nullable: true })
  observacion: string
  @Column({ type: 'varchar2', nullable: true })
  usuario_insercion: string
  @Column({ type: 'varchar2', nullable: true })
  estado: string
  @Column({ type: 'varchar2', nullable: true })
  estado_vacaciones: string
}

@Entity('DIRECCIONES')
export class Direcciones extends BaseEntity<Direcciones> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: false })
  id_empleado: number
  @Column({ type: 'number', nullable: false })
  principal: number
  @Column({ type: 'number', nullable: false })
  id_pais: number
  @Column({ type: 'number', nullable: false })
  id_provincia: number
  @Column({ type: 'varchar2', length: 100, nullable: false })
  calle: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  usuario_insercion: string
  @Column({ type: 'number', nullable: false })
  no_casa: number
  @Column({ type: 'varchar2', length: 200, nullable: false })
  info_adicional: string
  @Column({ type: 'varchar2', length: 1, nullable: false })
  estado: string
}
