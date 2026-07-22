import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { QualityPlan } from './quality-plan.entity';
import { ControlPoint } from './control-point.entity';

@Entity('control_plan')
export class ControlPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => QualityPlan, plan => plan.controlPlans)
  @JoinColumn({ name: 'plan_id' })
  plan: QualityPlan;

  @OneToMany(() => ControlPoint, point => point.controlPlan)
  controlPoints: ControlPoint[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
