import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Batch } from '../../../../core-domain/src/entities/batch.entity';

@Entity('batch_genealogy')
@Index(['batchId'])
export class BatchGenealogy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Batch)
  batch: Batch;

  @Column()
  batchNumber: string;

  @Column({ type: 'jsonb' })
  genealogyData: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
