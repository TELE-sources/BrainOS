// /Users/sader/BrainOS/packages/quality/src/modules/spc/entities/c-chart.entity.ts

import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ControlChart } from './control-chart.entity';

@Entity('c_chart')
export class CChart {
  @PrimaryColumn('uuid')
  chartId: string;

  @OneToOne(() => ControlChart, chart => chart.cDetail, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chartId' })
  chart: ControlChart;

  @Column({ type: 'jsonb', default: {} })
  factors: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
