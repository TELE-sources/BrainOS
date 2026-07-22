import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { CAPA } from './capa.entity';
import { ActionType, ActionStatus } from '../../../common/enums';

@Entity('capa_action')
@Index(['capaId', 'actionNumber'])
@Index(['status', 'dueDate'])
@Index(['responsible'])
export class CAPAAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CAPA, capa => capa.actions)
  capa: CAPA;

  @Column()
  actionNumber: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ActionType })
  type: ActionType;

  @Column()
  responsible: string;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ type: 'enum', enum: ActionStatus, default: ActionStatus.PLANNED })
  status: ActionStatus;

  @Column({ type: 'jsonb', default: {} })
  verification: Record<string, any>;

  @Column({ type: 'timestamp', nullable: true })
  completedDate: Date;

  @Column({ nullable: true })
  completedBy: string;

  @Column({ type: 'jsonb', default: {} })
  evidence: string[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
