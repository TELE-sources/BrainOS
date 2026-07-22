import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
} from 'typeorm';
import { DataCategory, DataStatus } from '../../../common/enums';

@Entity('quality_master_data')
@Unique(['code'])
@Index(['category'])
@Index(['status'])
export class QualityMasterData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: DataCategory })
  category: DataCategory;

  @Column({ type: 'jsonb' })
  specification: Record<string, any>;

  @Column({ type: 'enum', enum: DataStatus, default: DataStatus.ACTIVE })
  status: DataStatus;

  @Column({ type: 'timestamp', nullable: true })
  validFrom: Date;

  @Column({ type: 'timestamp', nullable: true })
  validTo: Date;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
