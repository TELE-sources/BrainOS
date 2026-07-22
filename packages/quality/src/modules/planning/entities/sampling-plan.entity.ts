import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { QualityPlan } from './quality-plan.entity';

@Entity('sampling_plan')
export class SamplingPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  sampleSize: number;

  @Column()
  inspectionLevel: string;

  @Column()
  samplingMethod: string;

  @ManyToOne(() => QualityPlan, plan => plan.samplingPlans)
  @JoinColumn({ name: 'plan_id' })
  plan: QualityPlan;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
