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
  usuario: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  fechaNacimiento: Date
  @Column({ type: 'number', length: 11, nullable: true })
  id_cargo: number
  @Column({ type: 'datetime' })
  fecha_insercion: Date
  @Column({ type: 'varchar2', length: 11, nullable: true })
  pass: string
}
@Entity('EMPRESA')
export class Empresa extends BaseEntity<Empresa> {
  @PrimaryGeneratedColumn()
  id: number
}
