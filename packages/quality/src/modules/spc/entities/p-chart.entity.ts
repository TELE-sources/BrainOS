// /Users/sader/BrainOS/packages/quality/src/modules/spc/entities/p-chart.entity.ts

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

@Entity('p_chart')
export class PChart {
  @PrimaryColumn('uuid')
  chartId: string;

  @OneToOne(() => ControlChart, chart => chart.pDetail, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chartId' })
  chart: ControlChart;

  @Column({ type: 'int' })
  sampleSize: number;

  @Column({ type: 'jsonb', default: {} })
  factors: Record<string, any>; // A2, D3, D4 constants for P chart?

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
