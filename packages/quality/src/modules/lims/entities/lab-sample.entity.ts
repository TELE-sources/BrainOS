import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InspectionOrder } from '../../inspection/entities/inspection-order.entity';
import { QualityOrganization } from '../../foundation/entities/quality-organization.entity';
import { SampleType } from '../../../common/enums';
import { SampleStatus } from '../../../common/enums';
import { StorageCondition } from '../../../common/enums';

@Entity('lab_sample')
export class LabSample {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: SampleType })
  sampleType: SampleType;

  @Column({ type: 'enum', enum: SampleStatus })
  status: SampleStatus;

  @Column({ type: 'timestamp' })
  collectedDate: Date;

  @Column({ type: 'timestamp' })
  receivedDate: Date;

  @Column({ type: 'enum', enum: StorageCondition })
  storageCondition: StorageCondition;

  @Column({ length: 100 })
  storageLocation: string;

  @Column()
  availableQuantity: number;

  @Column({ length: 50 })
  unit: string;

  @ManyToOne(() => InspectionOrder, order => order.labSamples)
  @JoinColumn({ name: 'inspection_order_id', nullable: true })
  inspectionOrder: InspectionOrder;

  @ManyToOne(() => QualityOrganization, org => org.labSamples)
  @JoinColumn({ name: 'customer_id', nullable: true })
  customer: QualityOrganization;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
