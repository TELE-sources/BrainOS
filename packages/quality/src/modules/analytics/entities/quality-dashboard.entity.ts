import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { DashboardType } from '../../../common/enums';

@Entity('quality_dashboard')
@Index(['name'])
@Index(['type'])
export class QualityDashboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: DashboardType })
  type: DashboardType;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb', default: {} })
  layout: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  filters: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  widgets: any[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
