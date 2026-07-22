import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { InspectionOrder } from './inspection-order.entity';

@Entity('incoming_inspection')
export class IncomingInspection {
  @PrimaryColumn('uuid')
  inspectionOrderId: string;
  @OneToOne(() => InspectionOrder, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inspectionOrderId' })
  inspectionOrder: InspectionOrder;
  @Column()
  supplier: string;
  @Column()
  purchaseOrderNumber: string;
  @Column()
  lotNumber: string;
  @Column('float')
  quantityReceived: number;
  @Column({ type: 'jsonb', default: {} })
  acceptanceCriteria: Record<string, any>;
  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
