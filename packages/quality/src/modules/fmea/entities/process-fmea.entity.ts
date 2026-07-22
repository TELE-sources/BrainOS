import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
  Unique,
} from 'typeorm';
import { ProcessSegment } from '../../../../core-domain/src/entities/process-segment.entity';
import { FMEAItem } from './fmea-item.entity';
import { FMEAStatus } from '../../../common/enums';

@Entity('process_fmea')
@Index(['fmeaNumber'])
@Unique(['fmeaNumber'])
export class ProcessFMEA {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  fmeaNumber: string;

  @Column()
  name: string;

  @ManyToOne(() => ProcessSegment)
  processSegment: ProcessSegment;

  @Column()
  version: string;

  @Column({ type: 'enum', enum: FMEAStatus, default: FMEAStatus.DRAFT })
  status: FMEAStatus;

  @OneToMany(() => FMEAItem, item => item.fmea, { cascade: true })
  items: FMEAItem[];

  @Column({ type: 'jsonb', default: {} })
  team: string[];

  @Column()
  responsible: string;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  completionDate: Date;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
