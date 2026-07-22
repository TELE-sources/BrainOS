import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ,
  UpdateDateColumn,
  ManyToOne,
  Index,
  Unique,
} from 'typeorm';
import { NonConformance } from './non-conformance.entity';
import { Batch } from '../../../../core-domain/src/entities/batch.entity';

@Entity('scrap')
@Index(['scrapNumber'])
@Unique(['scrapNumber'])
@Index(['disposalDate'])
export class Scrap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  scrapNumber: string;

  @ManyToOne(() => NonConformance)
  nonConformance: NonConformance;

  @ManyToOne(() => Batch)
  batch: Batch;

  @Column('float')
  quantity: number;

  @Column()
  unit: string;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column()
  disposedBy: string;

  @Column({ type: 'timestamp' })
  disposalDate: Date;

  @Column({ type: 'jsonb', default: {} })
  disposalMethod: Record<string, any>;

  @Column('float', { nullable: true })
  scrapValue: number;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
