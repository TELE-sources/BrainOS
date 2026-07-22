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
import { RiskRegister } from './risk-register.entity';
import { AssessmentType, AssessmentStatus } from '../../../common/enums';

@Entity('risk_assessment')
@Index(['riskRegisterId'])
@Index(['assessmentNumber'])
@Unique(['assessmentNumber'])
export class RiskAssessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => RiskRegister, register => register.assessments)
  riskRegister: RiskRegister;

  @Column({ unique: true })
  assessmentNumber: string;

  @Column({ type: 'enum', enum: AssessmentType, default: AssessmentType.INITIAL })
  type: AssessmentType;

  @Column({ type: 'text', nullable: true })
  scope: string;

  @Column({ type: 'enum', enum: AssessmentStatus, default: AssessmentStatus.PLANNED })
  status: AssessmentStatus;

  @Column({ nullable: true })
  assessedBy: string;

  @Column({ type: 'timestamp' })
  assessmentDate: Date;

  @Column({ type: 'jsonb', default: {} })
  methodology: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  conclusions: string[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
