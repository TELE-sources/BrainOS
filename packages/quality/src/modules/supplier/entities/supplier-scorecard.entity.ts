import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Supplier } from '../../../../core-domain/src/entities/supplier.entity';
import { ScorecardStatus } from '../../../common/enums';

@Entity('supplier_scorecard')
@Index(['scorecardNumber'])
@Index(['supplierId'])
export class SupplierScorecard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  scorecardNumber: string;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @Column()
  period: string; // e.g., "2024-Q1"

  @Column('float')
  score: number;

  @Column({ type: 'jsonb' })
  criteria: Record<string, any>;

  @Column({ type: 'enum', enum: ScorecardStatus })
  status: ScorecardStatus;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
