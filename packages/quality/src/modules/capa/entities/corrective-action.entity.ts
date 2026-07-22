import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { CAPA } from './capa.entity';
import { NonConformance } from '../../nc/entities/non-conformance.entity';

@Entity('corrective_action')
@Index(['nonConformanceId'])
export class CorrectiveAction {
  @PrimaryColumn('uuid')
  capaId: string;

  @OneToOne(() => CAPA, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'capaId' })
  capa: CAPA;

  @ManyToOne(() => NonConformance)
  nonConformance: NonConformance;

  @Column({ type: 'text' })
  rootCause: string;

  @Column({ type: 'jsonb', default: {} })
  correctiveMeasures: string[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
