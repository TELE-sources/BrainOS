import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InspectionOrder } from './inspection-order.entity';
import { InspectionCharacteristic } from '../../planning/entities/inspection-characteristic.entity';

@Entity('inspection_operation')
export class InspectionOperation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  sequenceNumber: number;

  @Column({ type: 'timestamp' })
  plannedStartDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  plannedEndDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualStartDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualEndDate: Date;

  @ManyToOne(() => InspectionOrder, order => order.inspectionOperations)
  @JoinColumn({ name: 'inspection_order_id' })
  inspectionOrder: InspectionOrder;

  @ManyToOne(() => InspectionCharacteristic, characteristic => characteristic.inspectionOperations)
  @JoinColumn({ name: 'characteristic_id' })
  characteristic: InspectionCharacteristic;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
