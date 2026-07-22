import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { QualityPlan } from '../../planning/entities/quality-plan.entity';
import { PredictionType } from '../../../common/enums';

@Entity('quality_prediction')
export class QualityPrediction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  predictionId: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => QualityPlan, plan => plan.predictions)
  @JoinColumn({ name: 'plan_id' })
  plan: QualityPlan;

  @Column({ type: 'enum', enum: PredictionType })
  type: PredictionType;

  @Column({ type: 'timestamp' })
  predictionDate: Date;

  @Column({ type: 'timestamp' })
  validUntil: Date;

  @Column()
  targetMetric: string;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  predictedValue: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  confidence: number; // 0-100%

  @Column({ type: 'json' })
  inputFeatures: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  modelUsed: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
