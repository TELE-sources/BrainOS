import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
  Unique,
} from 'typeorm';
import { ChangeImpactAssessment } from './change-impact-assessment.entity';
import { ChangeApproval } from './change-approval.entity';
import { ChangeType, ChangePriority, ChangeStatus } from '../../../common/enums';

@Entity('change_request')
@Index(['changeNumber'])
@Unique(['changeNumber'])
@Index(['status', 'requestedDate'])
export class ChangeRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  changeNumber: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ChangeType })
  type: ChangeType;

  @Column({ type: 'enum', enum: ChangePriority, default: ChangePriority.MEDIUM })
  priority: ChangePriority;

  @Column()
  requestedBy: string;

  @Column({ type: 'timestamp' })
  requestedDate: Date;

  @Column({ type: 'enum', enum: ChangeStatus, default: ChangeStatus.DRAFT })
  status: ChangeStatus;

  @Column({ type: 'timestamp', nullable: true })
  implementedDate: Date;

  @Column({ nullable: true })
  implementedBy: string;

  @Column({ type: 'jsonb', default: {} })
  relatedDocuments: string[];

  @OneToMany(() => ChangeImpactAssessment, assessment => assessment.changeRequest, { cascade: true })
  impactAssessments: ChangeImpactAssessment[];

  @OneToMany(() => ChangeApproval, approval => approval.changeRequest, { cascade: true })
  approvals: ChangeApproval[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
