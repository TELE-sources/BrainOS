import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { NonConformance } from './non-conformance.entity';

@Entity('internal_nc')
@Index(['department'])
export class InternalNC {
  @PrimaryColumn('uuid')
  ncId: string;

  @OneToOne(() => NonConformance, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ncId' })
  nonConformance: NonConformance;

  @Column()
  department: string;

  @Column()
  processStep: string;

  @Column({ nullable: true })
  machineId: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
