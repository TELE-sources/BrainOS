import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  Unique,
} from 'typeorm';
import { CAPA } from './capa.entity';
import { CheckType, CheckStatus } from '../../../common/enums';

@Entity('effectiveness_check')
@Index(['capaId'])
@Index(['checkNumber'])
@Unique(['checkNumber'])
@Index(['status', 'checkDate'])
export class EffectivenessCheck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CAPA, capa => capa.effectivenessChecks)
  capa: CAPA;

  @Column({ unique: true })
  checkNumber: string;

  @Column({ type: 'enum', enum: CheckType, default: CheckType.IMMEDIATE })
  type: CheckType;

  @Column({ type: 'jsonb', default: {} })
  criteria: string[];

  @Column({ type: 'enum', enum: CheckStatus, default: CheckStatus.PLANNED })
  status: CheckStatus;

  @Column({ default: false })
  effective: boolean;

  @Column({ type: 'text', nullable: true })
  justification: string;

  @Column({ nullable: true })
  checkedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  checkDate: Date;

  @Column({ type: 'jsonb', default: {} })
  metrics: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  lessonsLearned: string[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
