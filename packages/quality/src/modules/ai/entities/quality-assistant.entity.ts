import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { AssistantStatus } from '../../../common/enums';

@Entity('quality_assistant')
@Index(['status'])
export class QualityAssistant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  version: string;

  @Column({ type: 'enum', enum: AssistantStatus })
  status: AssistantStatus;

  @Column({ type: 'jsonb', default: {} })
  configuration: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
