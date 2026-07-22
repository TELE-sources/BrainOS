import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { QualityOrganization } from '../../foundation/entities/quality-organization.entity';

@Entity('product_return')
export class ProductReturn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  returnNumber: string;

  @Column({ length: 200 })
  productName: string;

  @Column({ length: 100 })
  productCode: string;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @ManyToOne(() => QualityOrganization, organization => organization.productReturns)
  @JoinColumn({ name: 'customer_id' })
  customer: QualityOrganization;

  @Column({ type: 'date' })
  returnDate: Date;

  @Column({ type: 'date', nullable: true })
  receivedDate: Date;

  @Column()
  reasonForReturn: string;

  @Column({ type: 'text', nullable: true })
  inspectionFindings: string;

  @Column()
  disposition: string; // e.g., 'REPAIR', 'REPLACE', 'REFUND', 'SCRAP'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  refundAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  replacementCost: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
