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
  @Column({ type: 'varchar2', length: 100, nullable: true })
  apellidos: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  usuario_insercion: string
  @Column({ type: 'char', length: 1, nullable: true })
  sexo: string
  @Column({ type: 'varchar2', length: 13, nullable: true })
  doc_identidad: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  tipo_doc_identidad: string
  @Column({ type: 'varchar2', length: 11, nullable: true })
  cedula: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  fechaNacimiento: Date
  @Column({ type: 'number', length: 11, nullable: true })
  id_cargo: number
  @Column({ type: 'datetime' })
  fecha_insercion: Date
  @Column({ type: 'varchar2', length: 100, nullable: true })
  estado: string
  @Column({ type: 'varchar2', nullable: true })
  imagen: string
  @Column({ type: 'varchar2', length: 11, nullable: true })
  pass: string
  @Column({ type: 'varchar2', length: 11, nullable: true })
  clave: string
}
@Entity('DET_CITAS')
export class Det_citas extends BaseEntity<Det_citas> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: true })
  id_consulta: number
  @Column({ type: 'number', nullable: true })
  id_tipo_lesion: number
  @Column({ type: 'number', nullable: true })
  id_color_lesion: number
  @Column({ type: 'number', nullable: true })
  id_enfermedad: number
  @Column({ type: 'varchar2', length: 100, nullable: true })
  localizacion: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  antecedentes_patologicos: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  tratamiento_previo: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  lesiones_anteriores: string
  @Column({ type: 'varchar2', nullable: true })
  fecha_lesion_anterior: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  detalles_extras: string
  @Column({ type: 'varchar2' })
  fecha_insercion: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  estado: string
}
@Entity('EMPRESA')
export class Empresa extends BaseEntity<Empresa> {
  @PrimaryGeneratedColumn()
  id: number
}
