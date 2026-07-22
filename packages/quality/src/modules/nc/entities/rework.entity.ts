import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  Unique,
} from 'typeorm';
import { NonConformance } from './non-conformance.entity';
import { Batch } from '../../../../core-domain/src/entities/batch.entity';
import { ReworkStatus } from '../../../common/enums';

@Entity('rework')
@Index(['reworkNumber'])
@Unique(['reworkNumber'])
@Index(['status', 'startDate'])
export class Rework {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  reworkNumber: string;

  @ManyToOne(() => NonConformance)
  nonConformance: NonConformance;

  @ManyToOne(() => Batch)
  batch: Batch;

  @Column('float')
  quantity: number;

  @Column()
  unit: string;

  @Column()
  operation: string;

  @Column({ type: 'enum', enum: ReworkStatus, default: ReworkStatus.PLANNED })
  status: ReworkStatus;

  @Column()
  responsible: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ type: 'jsonb', default: {} })
  reworkProcedure: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  inspectionResults: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
