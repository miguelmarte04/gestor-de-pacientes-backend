import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity('PERSONAS')
export class Personas extends BaseEntity<Personas> {
  @Column({ type: 'varchar2', length: 13, nullable: true })
  doc_identidad: string
}
@Entity('Empleado')
export class Empleado extends BaseEntity<Empleado> {
  @Column({ type: 'number', nullable: true })
  id_empleado: number
  @Column({ type: 'varchar2', nullable: true })
  estado: string
}
@Entity('FILTER_STATE')
export class filter_state extends BaseEntity<filter_state> {
  @Column({ type: 'varchar2', nullable: true })
  search: string
  @Column({ type: 'varchar2', nullable: true })
  type: string
}
@Entity('PROVINCIAS')
export class provincias extends BaseEntity<provincias> {
  @Column({ type: 'number', nullable: true })
  id_pais: number
}
@Entity('PARAMETROS')
export class parametros extends BaseEntity<provincias> {
  @Column({ type: 'varchar', nullable: true })
  id_actividad: string
}
@Entity('NOMINA')
export class Nomina extends BaseEntity<Nomina> {
  @Column({ type: 'varchar', nullable: true })
  tipo: string
}
@Entity('TIPO_PERMISOS')
export class getTiposPermisos extends BaseEntity<getTiposPermisos> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', nullable: true })
  tipo_permiso: string
  @Column({ type: 'varchar', nullable: true })
  estado: string
}
@Entity('CONSULTAS')
export class Consultas extends BaseEntity<Consultas> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: false })
  id_paciente: number
  @Column({ type: 'number', nullable: false })
  id_doctor: number
  @Column({ type: 'varchar2', length: 100, nullable: false })
  asunto: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  inicio: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  fin: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  fecha_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
