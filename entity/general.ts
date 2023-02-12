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
