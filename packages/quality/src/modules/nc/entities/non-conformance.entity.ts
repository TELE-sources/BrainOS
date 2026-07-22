import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Index,
  Unique,
} from 'typeorm';
import { MaterialLot } from '../../../../core-domain/src/entities/material-lot.entity';
import { Batch } from '../../../../core-domain/src/entities/batch.entity';
import { ProductionOrder } from '../../../../core-domain/src/entities/production-order.entity';
import { InspectionOrder } from '../../inspection/entities/inspection-order.entity';
import { InspectionDecision } from '../../inspection/entities/inspection-decision.entity';
import { CustomerComplaint } from '../../customer/entities/customer-complaint.entity';
import { CAPA } from '../../capa/entities/capa.entity';
import { Quarantine } from './quarantine.entity';
import { Scrap } from './scrap.entity';
import { Rework } from './rework.entity';
import { Concession } from './concession.entity';
import { InternalNC } from './internal-nc.entity';
import { SupplierNC } from './supplier-nc.entity';
import { CustomerNC } from './customer-nc.entity';
import { NCType, Severity, NCStatus, NCDisposition } from '../../../common/enums';

@Entity('non_conformance')
@Index(['type', 'status'])
@Index(['detectedDate'])
@Index(['severity'])
@Unique(['ncNumber'])
export class NonConformance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  ncNumber: string;

  @Column({ type: 'enum', enum: NCType })
  type: NCType;

  @Column({ type: 'enum', enum: Severity, default: Severity.MINOR })
  severity: Severity;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => MaterialLot, { nullable: true })
  materialLot: MaterialLot;

  @ManyToOne(() => Batch, { nullable: true })
  batch: Batch;

  @ManyToOne(() => ProductionOrder, { nullable: true })
  productionOrder: ProductionOrder;

  @ManyToOne(() => InspectionOrder, { nullable: true })
  inspectionOrder: InspectionOrder;

  @ManyToOne(() => InspectionDecision, { nullable: true })
  inspectionDecision: InspectionDecision;

  @ManyToOne(() => CustomerComplaint, { nullable: true })
  customerComplaint: CustomerComplaint;

  @Column('float', { nullable: true })
  quantity: number;

  @Column({ nullable: true })
  unit: string;

  @Column({ type: 'enum', enum: NCStatus, default: NCStatus.CREATED })
  status: NCStatus;

  @Column({ type: 'enum', enum: NCDisposition, nullable: true })
  disposition: NCDisposition;

  @OneToMany(() => CAPA, capa => capa.nonConformance)
  capas: CAPA[];

  @OneToMany(() => Quarantine, q => q.nonConformance)
  quarantines: Quarantine[];

  @OneToMany(() => Scrap, s => s.nonConformance)
  scraps: Scrap[];

  @OneToMany(() => Rework, r => r.nonConformance)
  reworks: Rework[];

  @OneToMany(() => Concession, c => c.nonConformance)
  concessions: Concession[];

  // Relations CTI
  @OneToOne(() => InternalNC, { nullable: true })
  internalDetail: InternalNC;

  @OneToOne(() => SupplierNC, { nullable: true })
  supplierDetail: SupplierNC;

  @OneToOne(() => CustomerNC, { nullable: true })
  customerDetail: CustomerNC;

  @Column({ type: 'jsonb', default: {} })
  analysis: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  rootCause: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  attachments: string[];

  @Column({ type: 'timestamp' })
  detectedDate: Date;

  @Column()
  detectedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  closureDate: Date;

  @Column({ nullable: true })
  closedBy: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
