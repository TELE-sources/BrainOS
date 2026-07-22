import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Audit } from './audit.entity';
import { FindingSeverity } from '../../../common/enums';

@Entity('audit_finding')
export class AuditFinding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Audit, audit => audit.auditFindings)
  @JoinColumn({ name: 'audit_id' })
  audit: Audit;

  @Column({ unique: true, length: 50 })
  findingNumber: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: FindingSeverity })
  severity: FindingSeverity;

  @Column({ length: 100 })
  standardClause: string; // e.g., 'ISO 9001:2015 Clause 8.5.1'

  @Column({ type: 'date' })
  identifiedDate: Date;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ type: 'date', nullable: true })
  closedDate: Date;

  @Column({ type: 'boolean', default: false })
  isClosed: boolean;

  @Column({ type: 'text', nullable: true })
  correctiveAction: string;

  @Column({ type: 'text', nullable: true })
  preventiveAction: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
