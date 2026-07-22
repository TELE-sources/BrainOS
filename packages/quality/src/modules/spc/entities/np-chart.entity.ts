// /Users/sader/BrainOS/packages/quality/src/modules/spc/entities/np-chart.entity.ts

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

@Entity('np_chart')
export class NPChart {
  @PrimaryColumn('uuid')
  chartId: string;

  @OneToOne(() => ControlChart, chart => chart.npDetail, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chartId' })
  chart: ControlChart;

  @Column({ type: 'int' })
  sampleSize: number;

  @Column({ type: 'jsonb', default: {} })
  factors: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
