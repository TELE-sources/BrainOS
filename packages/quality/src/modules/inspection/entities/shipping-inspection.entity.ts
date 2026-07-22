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

@Entity('shipping_inspection')
export class ShippingInspection {
  @PrimaryColumn('uuid')
  inspectionOrderId: string;

  @OneToOne(() => InspectionOrder, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inspectionOrderId' })
  inspectionOrder: InspectionOrder;

  @Column()
  destination: string;

  @Column()
  carrier: string;

  @Column()
  trackingNumber: string;

  @Column('int')
  quantityShipped: number;

  @Column({ type: 'jsonb', default: {} })
  inspectionCriteria: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
