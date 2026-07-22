import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { ControlChart } from './control-chart.entity';

@Entity('control_chart_point')
@Index(['chartId', 'timestamp'])
@Index(['outOfControl'])
export class ControlChartPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ControlChart, chart => chart.points)
  chart: ControlChart;

  @Column()
  index: number;

  @Column('float', { nullable: true })
  value: number;

  @Column('float', { nullable: true })
  subgroupMean: number;

  @Column('float', { nullable: true })
  subgroupRange: number;

  @Column('float', { nullable: true })
  subgroupStdDev: number;

  @Column({ nullable: true })
  subgroupSize: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ default: false })
  outOfControl: boolean;

  @Column({ type: 'jsonb', default: {} })
  violations: string[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
