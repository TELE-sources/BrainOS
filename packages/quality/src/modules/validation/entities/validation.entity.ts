import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { ProcessSegment } from '../../../../core-domain/src/entities/process-segment.entity';
import { QualityMasterData } from '../../foundation/entities/quality-master-data.entity';
import { ValidationProtocol } from './validation-protocol.entity';
import { ValidationResult } from './validation-result.entity';
import { ValidationType, ValidationStatus } from '../../../common/enums';

@Entity('validation')
@Index(['processSegmentId', 'characteristicId'])
@Index(['status'])
export class Validation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProcessSegment, { nullable: true })
  processSegment: ProcessSegment;

  @ManyToOne(() => QualityMasterData, { nullable: true })
  characteristic: QualityMasterData;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ValidationType })
  type: ValidationType;

  @Column({ type: 'enum', enum: ValidationStatus, default: ValidationStatus.PLANNED })
  status: ValidationStatus;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @OneToMany(() => ValidationProtocol, protocol => protocol.validation, { cascade: true })
  protocols: ValidationProtocol[];

  @OneToMany(() => ValidationResult, result => result.validation, { cascade: true })
  results: ValidationResult[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
