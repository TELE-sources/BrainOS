import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ComplianceStatus } from '../../../common/enums';

@Entity('compliance_requirement')
export class ComplianceRequirement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  requirementId: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 100 })
  source: string; // e.g., 'ISO 9001:2015', 'FDA 21 CFR Part 820'

  @Column({ type: 'enum', enum: ComplianceStatus })
  status: ComplianceStatus;

  @Column({ type: 'date' })
  effectiveDate: Date;

  @Column({ type: 'date', nullable: true })
  revisionDate: Date;

  @Column({ length: 200 })
  clauseReference: string;

  @Column({ type: 'text', nullable: true })
  implementationNotes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
