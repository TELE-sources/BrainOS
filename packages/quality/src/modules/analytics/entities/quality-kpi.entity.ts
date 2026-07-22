import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { KpiDefinition } from '../../../../core-domain/src/entities/kpi-definition.entity';
import { KpiStatus } from '../../../common/enums';

@Entity('quality_kpi')
@Index(['kpiId', 'timestamp'])
@Index(['value'])
export class QualityKPI {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => KpiDefinition)
  kpiDefinition: KpiDefinition;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column('float')
  value: number;

  @Column('int')
  targetValue: number;

  @Column('int')
  warningThreshold: number;

  @Column('int')
  criticalThreshold: number;

  @Column({ type: 'enum', enum: KpiStatus, default: KpiStatus.ACTIVE })
  status: KpiStatus;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
