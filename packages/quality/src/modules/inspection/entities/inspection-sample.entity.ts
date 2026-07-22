import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InspectionOrder } from './inspection-order.entity';
import { LabSample } from '../../lims/entities/lab-sample.entity';

@Entity('inspection_sample')
export class InspectionSample {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  sampleNumber: number;

  @Column()
  quantity: number;

  @Column({ length: 50 })
  unit: string;

  @ManyToOne(() => InspectionOrder, order => order.inspectionSamples)
  @JoinColumn({ name: 'inspection_order_id' })
  inspectionOrder: InspectionOrder;

  @ManyToOne(() => LabSample, sample => sample.inspectionSamples)
  @JoinColumn({ name: 'lab_sample_id', nullable: true })
  labSample: LabSample;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
