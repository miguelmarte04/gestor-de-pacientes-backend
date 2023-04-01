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
  @Column({ type: 'number', nullable: false })
  dia: number
  @Column({ type: 'varchar2', length: 100, nullable: false })
  asunto: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  cedula: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  id_tanda: string
  @Column({ type: 'varchar2', nullable: false })
  detalles_consulta: string
  @Column({ type: 'varchar2', nullable: false })
  receta: string
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
@Entity('DOCTOR')
export class Doctor extends BaseEntity<Doctor> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', length: 100, nullable: false })
  cedula: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  nombre: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  exequatur: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  apellido: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  imagen: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  fecha_nacimiento: string
  @Column({ type: 'number', nullable: false })
  id_especialidad: number
  @Column({ type: 'number', nullable: false })
  id_nacionalidad: number
  @Column({ type: 'varchar2', length: 100, nullable: false })
  telefono: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  sexo: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  correo: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  clave: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  fecha_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('ESPECIALIDADES')
export class Especialidades extends BaseEntity<Especialidades> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar2', length: 100, nullable: false })
  nombre: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  fecha_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
@Entity('HORARIOS')
export class Horarios extends BaseEntity<Horarios> {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'number', nullable: false })
  id_doctor: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  oficina: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  tanda_tarde: string
  @Column({ type: 'varchar2', length: 100, nullable: false })
  tanda_manana: string
  @Column({ type: 'varchar2', length: 100, nullable: true })
  fecha_insercion: string
  @Column({ type: 'varchar2', length: 1, nullable: true })
  estado: string
}
