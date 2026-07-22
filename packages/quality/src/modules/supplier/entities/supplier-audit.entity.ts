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
import { AuditStatus } from '../../../common/enums';

@Entity('supplier_audit')
@Index(['auditNumber'])
@Index(['supplierId'])
export class SupplierAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  auditNumber: string;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @Column()
  auditor: string;

  @Column({ type: 'timestamp' })
  auditDate: Date;

  @Column()
  scope: string;

  @Column({ type: 'jsonb' })
  criteria: Record<string, any>;

  @Column({ type: 'jsonb' })
  findings: Record<string, any>;

  @Column({ type: 'enum', enum: AuditStatus })
  status: AuditStatus;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
