import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { ProcessSegment } from '../../../../core-domain/src/entities/process-segment.entity';
import { QualityMasterData } from '../../foundation/entities/quality-master-data.entity';
import { CapabilityStatus } from '../../../common/enums';

@Entity('process_capability')
@Index(['processSegmentId', 'characteristicId'])
@Index(['calculationDate'])
export class ProcessCapability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProcessSegment)
  processSegment: ProcessSegment;

  @ManyToOne(() => QualityMasterData)
  characteristic: QualityMasterData;

  @Column('float', { nullable: true })
  cp: number;

  @Column('float', { nullable: true })
  cpk: number;

  @Column('float', { nullable: true })
  pp: number;

  @Column('float', { nullable: true })
  ppk: number;

  @Column('float', { nullable: true })
  zScore: number;

  @Column('float', { nullable: true })
  defectsPerMillion: number;

  @Column({ nullable: true })
  sigmaLevel: number;

  @Column({ type: 'enum', enum: CapabilityStatus, default: CapabilityStatus.ACCEPTABLE })
  status: CapabilityStatus;

  @Column({ type: 'jsonb', default: {} })
  confidenceIntervals: Record<string, any>;

  @Column({ type: 'timestamp' })
  calculationDate: Date;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
