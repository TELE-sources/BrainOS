import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Validation } from './validation.entity';
import { ProtocolStatus } from '../../../common/enums';

@Entity('validation_protocol')
@Index(['validationId'])
export class ValidationProtocol {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Validation)
  validation: Validation;

  @Column()
  name: string;

  @Column()
  version: string;

  @Column({ type: 'jsonb', default: {} })
  procedures: string[];

  @Column({ type: 'jsonb', default: {} })
  acceptanceCriteria: string[];

  @Column({ type: 'enum', enum: ProtocolStatus, default: ProtocolStatus.DRAFT })
  status: ProtocolStatus;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
