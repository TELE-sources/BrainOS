import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InspectionOrder } from './inspection-order.entity';

@Entity('inspection_decision')
export class InspectionDecision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  decision: string; // e.g., 'ACCEPT', 'REJECT', 'CONDITIONAL_ACCEPT'

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @ManyToOne(() => InspectionOrder, order => order.inspectionDecisions)
  @JoinColumn({ name: 'inspection_order_id' })
  inspectionOrder: InspectionOrder;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
