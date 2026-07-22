import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { QualityOrganization } from '../../foundation/entities/quality-organization.entity';
import { ClaimStatus } from '../../../common/enums';

@Entity('customer_claim')
export class CustomerClaim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  claimNumber: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  receivedDate: Date;

  @ManyToOne(() => QualityOrganization, organization => organization.customerClaims)
  @JoinColumn({ name: 'customer_id' })
  customer: QualityOrganization;

  @Column({ type: 'enum', enum: ClaimStatus })
  status: ClaimStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  claimedAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  approvedAmount: number;

  @Column({ length: 100 })
  claimedBy: string;

  @Column({ type: 'date', nullable: true })
  investigationStartDate: Date;

  @Column({ type: 'date', nullable: true })
  investigationEndDate: Date;

  @Column({ type: 'text', nullable: true })
  investigationFindings: string;

  @Column({ type: 'date', nullable: true })
  resolutionDate: Date;

  @Column({ length: 200 })
  resolutionDescription: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
