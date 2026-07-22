// /Users/sader/BrainOS/packages/quality/src/modules/spc/entities/xbar-r-chart.entity.ts

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

@Entity('xbar_r_chart')
export class XbarRChart {
  @PrimaryColumn('uuid')
  chartId: string;

  @OneToOne(() => ControlChart, chart => chart.xbarRDetail, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chartId' })
  chart: ControlChart;

  @Column({ type: 'float' })
  subgroupSize: number;

  @Column({ type: 'jsonb', default: {} })
  factors: Record<string, any>; // A2, D3, D4 constants

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
