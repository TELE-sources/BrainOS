import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { QualityMasterData } from '../../foundation/entities/quality-master-data.entity';
import { TrendPeriod } from '../../../common/enums';

@Entity('quality_trend')
@Index(['characteristicId', 'period'])
@Index(['periodStart', 'periodEnd'])
export class QualityTrend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => QualityMasterData)
  characteristic: QualityMasterData;

  @Column({ type: 'enum', enum: TrendPeriod })
  period: TrendPeriod;

  @Column('float')
  value: number;

  @Column('float', { nullable: true })
  movingAverage: number;

  @Column('float', { nullable: true })
  standardDeviation: number;

  @Column({ type: 'jsonb', default: {} })
  seasonality: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  predictions: Record<string, any>;

  @Column({ type: 'timestamp' })
  periodStart: Date;

  @Column({ type: 'timestamp' })
  periodEnd: Date;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
