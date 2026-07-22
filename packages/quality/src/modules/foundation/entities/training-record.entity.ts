import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { TrainingStatus } from '../../../common/enums';

@Entity('training_record')
@Index(['employeeId', 'trainingType'])
@Index(['startDate'])
export class TrainingRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column()
  trainingType: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  trainer: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'enum', enum: TrainingStatus })
  status: TrainingStatus;

  @Column({ nullable: true })
  certificateNumber: string;

  @Column({ type: 'float', nullable: true })
  result: number;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
