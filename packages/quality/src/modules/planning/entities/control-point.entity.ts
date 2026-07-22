import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ControlPlan } from './control-plan.entity';

@Entity('control_point')
export class ControlPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  specificationLimit: number;

  @Column()
  measurementUnit: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  samplingFrequency: number;

  @ManyToOne(() => ControlPlan, plan => plan.controlPoints)
  @JoinColumn({ name: 'control_plan_id' })
  controlPlan: ControlPlan;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
