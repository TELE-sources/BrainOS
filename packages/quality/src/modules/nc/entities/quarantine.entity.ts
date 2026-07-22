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
import { MaterialLot } from '../../../../core-domain/src/entities/material-lot.entity';
import { Batch } from '../../../../core-domain/src/entities/batch.entity';
import { QuarantineStatus } from '../../../common/enums';

@Entity('quarantine')
@Index(['quarantineNumber'])
@Unique(['quarantineNumber'])
@Index(['status', 'startDate'])
export class Quarantine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  quarantineNumber: string;

  @ManyToOne(() => NonConformance)
  nonConformance: NonConformance;

  @ManyToOne(() => MaterialLot, { nullable: true })
  materialLot: MaterialLot;

  @ManyToOne(() => Batch, { nullable: true })
  batch: Batch;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'enum', enum: QuarantineStatus, default: QuarantineStatus.ACTIVE })
  status: QuarantineStatus;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  releasedBy: string;

  @Column({ type: 'jsonb', default: {} })
  inspectionResults: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
