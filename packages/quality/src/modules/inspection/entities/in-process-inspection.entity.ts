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

@Entity('in_process_inspection')
export class InProcessInspection {
  @PrimaryColumn('uuid')
  inspectionOrderId: string;
  @OneToOne(() => InspectionOrder, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inspectionOrderId' })
  inspectionOrder: InspectionOrder;
  @Column()
  operation: string;
  @Column()
  workStation: string;
  @Column()
  batchNumber: string;
  @Column('float')
  quantityInProcess: number;
  @Column({ type: 'jsonb', default: {} })
  inspectionCriteria: Record<string, any>;
  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
