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

@Entity('final_inspection')
export class FinalInspection {
  @PrimaryColumn('uuid')
  inspectionOrderId: string;

  @OneToOne(() => InspectionOrder, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inspectionOrderId' })
  inspectionOrder: InspectionOrder;

  @Column()
  inspectionCriteria: string;

  @Column('int')
  inspectedUnits: number;

  @Column('int')
  defectiveUnits: number;

  @Column({ type: 'jsonb', default: {} })
  defectDetails: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
