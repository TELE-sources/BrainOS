import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
} from 'typeorm';
import { ChangeType, ChangeLogStatus } from '../../../common/enums';

@Entity('change_log')
@Unique(['changeNumber'])
@Index(['changedAt'])
@Index(['relatedEntityType', 'relatedEntityId'])
export class ChangeLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  changeNumber: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  changedBy: string;

  @Column({ type: 'timestamp' })
  changedAt: Date;

  @Column()
  relatedEntityType: string;

  @Column()
  relatedEntityId: string;

  @Column({ type: 'enum', enum: ChangeType })
  changeType: ChangeType;

  @Column({ type: 'enum', enum: ChangeLogStatus })
  status: ChangeLogStatus;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
