import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { ProcessFMEA } from './process-fmea.entity';
import { FMEAItemStatus } from '../../../common/enums';

@Entity('fmea_item')
@Index(['fmeaId', 'step'])
@Index(['rpn'])
export class FMEAItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProcessFMEA, fmea => fmea.items)
  fmea: ProcessFMEA;

  @Column()
  step: string;

  @Column()
  failureMode: string;

  @Column()
  failureEffect: string;

  @Column('float')
  severity: number; // 1-10

  @Column('float')
  occurrence: number; // 1-10

  @Column('float')
  detection: number; // 1-10

  @Column('float')
  rpn: number; // Severity * Occurrence * Detection

  @Column({ type: 'text', nullable: true })
  recommendedAction: string;

  @Column({ nullable: true })
  actionOwner: string;

  @Column({ type: 'enum', enum: FMEAItemStatus, default: FMEAItemStatus.IDENTIFIED })
  status: FMEAItemStatus;

  @Column({ type: 'jsonb', default: {} })
  verification: Record<string, any>;

  @Column('float', { nullable: true })
  newSeverity: number;

  @Column('float', { nullable: true })
  newOccurrence: number;

  @Column('float', { nullable: true })
  newDetection: number;

  @Column('float', { nullable: true })
  newRpn: number;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
