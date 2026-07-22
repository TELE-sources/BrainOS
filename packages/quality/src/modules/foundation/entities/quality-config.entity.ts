import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
} from 'typeorm';
import { QualityConfigStatus } from '../../../common/enums';

@Entity('quality_config')
@Unique(['code'])
@Index(['status'])
export class QualityConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: QualityConfigStatus })
  status: QualityConfigStatus;

  @Column()
  version: string;

  @Column({ type: 'timestamp', nullable: true })
  effectiveDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiryDate: Date;

  @Column({ type: 'jsonb', default: {} })
  parameters: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
