import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ComplianceRequirement } from './compliance-requirement.entity';
import { IsoCertificationStatus } from '../../../common/enums';

@Entity('iso_certification')
export class IsoCertification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  certificateNumber: string;

  @Column({ length: 200 })
  certificationName: string; // e.g., 'ISO 9001:2015 Quality Management Systems'

  @Column({ length: 100 })
  standardCode: string; // e.g., 'ISO 9001'

  @ManyToOne(() => ComplianceRequirement, requirement => requirement.isoCertifications)
  @JoinColumn({ name: 'requirement_id' })
  requirement: ComplianceRequirement;

  @Column({ type: 'date' })
  issueDate: Date;

  @Column({ type: 'date' })
  expiryDate: Date;

  @Column({ type: 'enum', enum: IsoCertificationStatus })
  status: IsoCertificationStatus;

  @Column({ length: 200 })
  issuingBody: string; // e.g., 'BSI', 'TUV SUD', 'DNV GL'

  @Column({ type: 'text', nullable: true })
  scope: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
