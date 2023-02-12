import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import BaseEntity from './BaseEntity'
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
@Entity('PACIENTE')
export class Paciente extends BaseEntity<Paciente> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', length: 100, nullable: false })
  cedula: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  nombres: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  apellidos: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  imagen: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  fecha_nacimiento: string
  @Column({ type: 'number', nullable: false })
  id_seguro: number
  @Column({ type: 'number', nullable: false })
  id_nacionalidad: number
  @Column({ type: 'varchar2', length: 100, nullable: false })
  telefono: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  sexo: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  email: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  clave: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  fecha_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
