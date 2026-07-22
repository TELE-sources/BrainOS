import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { ChangeRequest } from './change-request.entity';
import { ApprovalDecision } from '../../../common/enums';

@Entity('change_approval')
@Index(['changeRequestId'])
@Index(['status', 'decisionDate'])
export class ChangeApproval {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ChangeRequest)
  changeRequest: ChangeRequest;

  @Column()
  approver: string;

  @Column({ type: 'timestamp' })
  decisionDate: Date;

  @Column({ type: 'enum', enum: ApprovalDecision })
  decision: ApprovalDecision;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
