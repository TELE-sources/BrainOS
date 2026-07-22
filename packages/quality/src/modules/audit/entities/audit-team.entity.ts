import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';

@Entity('audit_team')
export class AuditTeam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Audit, audit => audit.auditTeam)
  @JoinColumn({ name: 'audit_id' })
  audit: Audit;

  @Column({ length: 100 })
  memberName: string;

  @Column({ length: 100 })
  role: string; // e.g., 'LEAD_AUDITOR', 'TECHNICAL_EXPERT', 'OBSERVER'

  @Column({ type: 'boolean', default: false })
  isLead: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
