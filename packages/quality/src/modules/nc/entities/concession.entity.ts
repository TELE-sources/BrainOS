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
import { ConcessionType, DurationUnit, ConcessionStatus } from '../../../common/enums';

@Entity('concession')
@Index(['concessionNumber'])
@Unique(['concessionNumber'])
@Index(['status', 'requestDate'])
export class Concession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  concessionNumber: string;

  @ManyToOne(() => NonConformance)
  nonConformance: NonConformance;

  @Column({ type: 'enum', enum: ConcessionType })
  type: ConcessionType;

  @Column({ type: 'text', nullable: true })
  scope: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ type: 'enum', enum: DurationUnit, nullable: true })
  unit: DurationUnit;

  @Column({ type: 'enum', enum: ConcessionStatus, default: ConcessionStatus.REQUESTED })
  status: ConcessionStatus;

  @Column()
  requestedBy: string;

  @Column({ type: 'timestamp' })
  requestDate: Date;

  @Column({ nullable: true })
  approvedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  approvalDate: Date;

  @Column({ type: 'jsonb', default: {} })
  conditions: string[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
