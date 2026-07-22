// /Users/sader/BrainOS/packages/quality/src/modules/spc/entities/control-chart.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Index,
  Unique,
} from 'typeorm';
import { ProcessSegment } from '../../../../core-domain/src/entities/process-segment.entity';
import { QualityMasterData } from '../../foundation/entities/quality-master-data.entity';
import { ControlChartPoint } from './control-chart-point.entity';
import { XbarRChart } from './xbar-r-chart.entity';
import { PChart } from './p-chart.entity';
import { NPChart } from './np-chart.entity';
import { CChart } from './c-chart.entity';
import { UChart } from './u-chart.entity';
import { IMRChart } from './imr-chart.entity';
import { ControlChartType, ControlChartStatus } from '../../../common/enums';

export interface ControlRule {
  name: string;
  description: string;
  enabled: boolean;
  threshold?: number;
}

@Entity('control_chart')
@Index(['chartNumber'])
@Unique(['chartNumber'])
@Index(['processSegmentId', 'characteristicId'])
export class ControlChart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  chartNumber: string;

  @Column({ type: 'enum', enum: ControlChartType })
  type: ControlChartType;

  @ManyToOne(() => ProcessSegment)
  processSegment: ProcessSegment;

  @ManyToOne(() => QualityMasterData)
  characteristic: QualityMasterData;

  @Column('float')
  ucl: number;

  @Column('float')
  lcl: number;

  @Column('float')
  centerLine: number;

  @Column('float')
  sigma: number;

  @OneToMany(() => ControlChartPoint, point => point.chart, { cascade: true })
  points: ControlChartPoint[];

  @Column({ type: 'jsonb', default: [] })
  rules: ControlRule[];

  @Column({ type: 'enum', enum: ControlChartStatus, default: ControlChartStatus.ACTIVE })
  status: ControlChartStatus;

  // Relations CTI
  @OneToOne(() => XbarRChart, { nullable: true })
  xbarRDetail: XbarRChart;

  @OneToOne(() => PChart, { nullable: true })
  pDetail: PChart;

  @OneToOne(() => NPChart, { nullable: true })
  npDetail: NPChart;

  @OneToOne(() => CChart, { nullable: true })
  cDetail: CChart;

  @OneToOne(() => UChart, { nullable: true })
  uDetail: UChart;

  @OneToOne(() => IMRChart, { nullable: true })
  imrDetail: IMRChart;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
