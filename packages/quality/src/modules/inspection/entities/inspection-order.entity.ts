import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { InspectionPlan } from '../../planning/entities/inspection-plan.entity';
import { QualityOrganization } from '../../foundation/entities/quality-organization.entity';
import { IncomingInspection } from './incoming-inspection.entity';
import { InProcessInspection } from './in-process-inspection.entity';
import { FinalInspection } from './final-inspection.entity';
import { ShippingInspection } from './shipping-inspection.entity';
import { InspectionType } from '../../../common/enums';
import { Priority } from '../../../common/enums';
import { InspectionStatus } from '../../../common/enums';

@Entity('inspection_order')
export class InspectionOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: InspectionType })
  type: InspectionType;

  @Column({ type: 'enum', enum: Priority })
  priority: Priority;

  @Column({ type: 'enum', enum: InspectionStatus })
  status: InspectionStatus;

  @Column({ type: 'timestamp' })
  scheduledDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ length: 100 })
  inspectorId: string;

  @Column()
  location: string;

  @Column()
  sampleSize: number;

  @ManyToOne(() => InspectionPlan, plan => plan.inspectionOrders)
  @JoinColumn({ name: 'plan_id' })
  plan: InspectionPlan;

  @ManyToOne(() => QualityOrganization, org => org.inspectionOrders)
  @JoinColumn({ name: 'supplier_id', nullable: true })
  supplier: QualityOrganization;

  // CTI Relations
  @OneToOne(() => IncomingInspection, incoming => incoming.inspectionOrder, { nullable: true })
  incomingInspection: IncomingInspection;

  @OneToOne(() => InProcessInspection, inProcess => inProcess.inspectionOrder, { nullable: true })
  inProcessInspection: InProcessInspection;

  @OneToOne(() => FinalInspection, final => final.inspectionOrder, { nullable: true })
  finalInspection: FinalInspection;

  @OneToOne(() => ShippingInspection, shipping => shipping.inspectionOrder, { nullable: true })
  shippingInspection: ShippingInspection;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
