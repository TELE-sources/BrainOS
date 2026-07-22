import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { QualityPlan } from './quality-plan.entity';
import { PhaseStatus } from '../../../common/enums';

@Entity('quality_phase')
export class QualityPhase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: PhaseStatus })
  status: PhaseStatus;

  @Column({ type: 'timestamp' })
  plannedStartDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  plannedEndDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualStartDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualEndDate: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  progressPercent: number;

  @ManyToOne(() => QualityPlan, plan => plan.phases)
  @JoinColumn({ name: 'plan_id' })
  plan: QualityPlan;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
