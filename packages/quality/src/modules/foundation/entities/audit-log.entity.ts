import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { AuditAction } from '../../../common/enums';

@Entity('audit_log')
@Index(['entityType', 'entityId'])
@Index(['performedAt'])
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  entityType: string;

  @Column()
  entityId: string;

  @Column({ type: 'enum', enum: AuditAction })
  action: AuditAction;

  @Column()
  performedBy: string;

  @Column({ type: 'timestamp' })
  performedAt: Date;

  @Column({ type: 'jsonb' })
  details: Record<string, any>;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
