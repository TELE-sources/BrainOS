import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { NonConformance } from './non-conformance.entity';
import { Supplier } from '../../../../core-domain/src/entities/supplier.entity';

@Entity('supplier_nc')
@Index(['supplierId'])
@Index(['purchaseOrderNumber'])
export class SupplierNC {
  @PrimaryColumn('uuid')
  ncId: string;

  @OneToOne(() => NonConformance, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ncId' })
  nonConformance: NonConformance;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @Column()
  purchaseOrderNumber: string;

  @Column({ nullable: true })
  deliveryNoteNumber: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
