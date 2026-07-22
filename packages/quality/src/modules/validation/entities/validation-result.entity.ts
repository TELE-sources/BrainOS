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
import { ResultStatus } from '../../../common/enums';

@Entity('validation_result')
@Index(['validationId'])
export class ValidationResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Validation)
  validation: Validation;

  @Column()
  testName: string;

  @Column()
  testMethod: string;

  @Column({ type: 'enum', enum: ResultStatus, default: ResultStatus.PENDING })
  result: ResultStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
