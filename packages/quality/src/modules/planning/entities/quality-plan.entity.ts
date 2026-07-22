import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { QualityConfig } from '../../foundation/entities/quality-config.entity';
import { QualityPlanType } from '../../../common/enums';
import { QualityPlanStatus } from '../../../common/enums';

@Entity('quality_plan')
export class QualityPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: QualityPlanType })
  planType: QualityPlanType;

  @Column({ type: 'enum', enum: QualityPlanStatus })
  status: QualityPlanStatus;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ length: 100 })
  responsibleParty: string;

  @ManyToOne(() => QualityConfig, config => config.qualityPlans)
  @JoinColumn({ name: 'config_id' })
  config: QualityConfig;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
