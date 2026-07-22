import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { CopilotStatus } from '../../../common/enums';

@Entity('quality_copilot')
@Index(['status'])
export class QualityCopilot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  version: string;

  @Column({ type: 'enum', enum: CopilotStatus })
  status: CopilotStatus;

  @Column({ type: 'jsonb', default: {} })
  configuration: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
