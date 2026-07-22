import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { CAPA } from './capa.entity';

@Entity('preventive_action')
@Index(['riskAssessment'])
export class PreventiveAction {
  @PrimaryColumn('uuid')
  capaId: string;

  @OneToOne(() => CAPA, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'capaId' })
  capa: CAPA;

  @Column({ type: 'text' })
  riskAssessment: string;

  @Column({ type: 'text' })
  potentialFailure: string;

  @Column({ type: 'jsonb', default: {} })
  preventiveMeasures: string[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
