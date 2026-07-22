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
import { RiskAssessment } from './risk-assessment.entity';
import { RiskCategory, RiskLevel, RiskStatus } from '../../../common/enums';

@Entity('risk_register')
@Index(['riskNumber'])
@Unique(['riskNumber'])
@Index(['category', 'status'])
@Index(['riskLevel'])
export class RiskRegister {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  riskNumber: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: RiskCategory })
  category: RiskCategory;

  @Column({ nullable: true })
  source: string;

  @Column('float')
  likelihood: number; // 1-5

  @Column('float')
  impact: number; // 1-5

  @Column('float')
  riskScore: number; // Likelihood * Impact

  @Column({ type: 'enum', enum: RiskLevel, default: RiskLevel.MEDIUM })
  riskLevel: RiskLevel;

  @Column({ type: 'enum', enum: RiskStatus, default: RiskStatus.IDENTIFIED })
  status: RiskStatus;

  @Column({ nullable: true })
  owner: string;

  @Column({ type: 'jsonb', default: {} })
  mitigation: string[];

  @Column({ type: 'jsonb', default: {} })
  contingency: string[];

  @Column({ type: 'jsonb', default: {} })
  monitoring: Record<string, any>;

  @OneToMany(() => RiskAssessment, ra => ra.riskRegister, { cascade: true })
  assessments: RiskAssessment[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
