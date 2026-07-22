import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InspectionOrder } from './inspection-order.entity';

@Entity('inspection_equipment')
export class InspectionEquipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100 })
  serialNumber: string;

  @Column({ length: 100 })
  calibrationCertificateNumber: string;

  @Column({ type: 'timestamp', nullable: true })
  lastCalibrationDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  nextCalibrationDate: Date;

  @ManyToOne(() => InspectionOrder, order => order.inspectionEquipment)
  @JoinColumn({ name: 'inspection_order_id' })
  inspectionOrder: InspectionOrder;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
