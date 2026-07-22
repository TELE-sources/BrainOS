import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ComplianceRequirement } from './compliance-requirement.entity';
import { RegulatoryFramework } from '../../../common/enums';

@Entity('regulatory_obligation')
export class RegulatoryObligation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  obligationId: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => ComplianceRequirement, requirement => requirement.regulatoryObligations)
  @JoinColumn({ name: 'requirement_id' })
  requirement: ComplianceRequirement;

  @Column({ type: 'enum', enum: RegulatoryFramework })
  framework: RegulatoryFramework;

  @Column({ length: 100 })
  jurisdiction: string; // e.g., 'FDA', 'EMA', 'EU', 'US', 'GLOBAL'

  @Column({ type: 'date' })
  effectiveDate: Date;

  @Column({ type: 'date', nullable: true })
  expirationDate: Date;

  @Column()
  complianceStatus: string; // e.g., 'COMPLIANT', 'NON_COMPLIANT', 'PARTIALLY_COMPLIANT'

  @Column({ type: 'text', nullable: true })
  evidenceLocation: string;

  @Column({ type: 'date', nullable: true })
  lastReviewDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
