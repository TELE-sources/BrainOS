import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Index,
  Unique,
} from 'typeorm';
import { NonConformance } from '../../nc/entities/non-conformance.entity';
import { AuditFinding } from '../../audit/entities/audit-finding.entity';
import { CAPAAction } from './capa-action.entity';
import { RootCauseAnalysis } from './root-cause-analysis.entity';
import { EffectivenessCheck } from './effectiveness-check.entity';
import { CorrectiveAction } from './corrective-action.entity';
import { PreventiveAction } from './preventive-action.entity';
import { CAPAType, CAPAStatus, Effectiveness } from '../../../common/enums';

@Entity('capa')
@Index(['capaNumber'])
@Unique(['capaNumber'])
@Index(['status', 'dueDate'])
@Index(['responsible'])
export class CAPA {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  capaNumber: string;

  @Column({ type: 'enum', enum: CAPAType })
  type: CAPAType;

  @ManyToOne(() => NonConformance, { nullable: true })
  nonConformance: NonConformance;

  @ManyToOne(() => AuditFinding, { nullable: true })
  auditFinding: AuditFinding;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  rootCause: string;

  @OneToMany(() => RootCauseAnalysis, rca => rca.capa, { cascade: true })
  rootCauseAnalyses: RootCauseAnalysis[];

  @OneToMany(() => CAPAAction, action => action.capa, { cascade: true })
  actions: CAPAAction[];

  @OneToMany(() => EffectivenessCheck, ec => ec.capa, { cascade: true })
  effectivenessChecks: EffectivenessCheck[];

  // Relations CTI
  @OneToOne(() => CorrectiveAction, { nullable: true })
  correctiveDetail: CorrectiveAction;

  @OneToOne(() => PreventiveAction, { nullable: true })
  preventiveDetail: PreventiveAction;

  @Column({ type: 'enum', enum: CAPAStatus, default: CAPAStatus.CREATED })
  status: CAPAStatus;

  @Column()
  responsible: string;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  verificationDate: Date;

  @Column({ nullable: true })
  verifiedBy: string;

  @Column({ type: 'enum', enum: Effectiveness, nullable: true })
  effectiveness: Effectiveness;

  @Column({ type: 'timestamp', nullable: true })
  closureDate: Date;

  @Column({ nullable: true })
  closedBy: string;

  @Column({ type: 'jsonb', default: {} })
  attachments: string[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
