import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { QualityOrganization } from '../../foundation/entities/quality-organization.entity';
import { ComplaintType } from '../../../common/enums';

@Entity('customer_complaint')
export class CustomerComplaint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  complaintNumber: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ComplaintType })
  complaintType: ComplaintType;

  @Column({ type: 'date' })
  receivedDate: Date;

  @Column({ length: 100 })
  customerName: string;

  @ManyToOne(() => QualityOrganization, organization => organization.customerComplaints)
  @JoinColumn({ name: 'customer_id' })
  customer: QualityOrganization;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  estimatedImpact: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  actualImpact: number;

  @Column({ length: 50 })
  severity: string; // e.g., 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'

  @Column({ length: 50 })
  priority: string; // e.g., 'LOW', 'MEDIUM', 'HIGH', 'URGENT'

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ type: 'date', nullable: true })
  resolvedDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
