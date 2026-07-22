import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { NonConformance } from './non-conformance.entity';
import { Customer } from '../../../../core-domain/src/entities/customer.entity';

@Entity('customer_nc')
@Index(['customerId'])
@Index(['complaintNumber'])
export class CustomerNC {
  @PrimaryColumn('uuid')
  ncId: string;

  @OneToOne(() => NonConformance, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ncId' })
  nonConformance: NonConformance;

  @ManyToOne(() => Customer)
  customer: Customer;

  @Column()
  complaintNumber: string;

  @Column({ type: 'timestamp', nullable: true })
  complaintDate: Date;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
