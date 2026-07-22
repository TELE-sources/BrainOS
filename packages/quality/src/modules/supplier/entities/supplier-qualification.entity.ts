import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Supplier } from '../../../../core-domain/src/entities/supplier.entity';
import { QualificationStatus } from '../../../common/enums';

@Entity('supplier_qualification')
@Index(['qualificationNumber'])
@Index(['supplierId'])
export class SupplierQualification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  qualificationNumber: string;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @Column()
  qualificationType: string;

  @Column({ type: 'enum', enum: QualificationStatus })
  status: QualificationStatus;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiryDate: Date;

  @Column({ type: 'jsonb', default: {} })
  criteria: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  evidence: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
