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
import { RCAMethod } from '../../../common/enums';

@Entity('root_cause_analysis')
@Index(['capaId'])
export class RootCauseAnalysis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CAPA, capa => capa.rootCauseAnalyses)
  capa: CAPA;

  @Column({ type: 'enum', enum: RCAMethod })
  method: RCAMethod;

  @Column({ type: 'jsonb' })
  analysis: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  findings: string[];

  @Column({ type: 'jsonb', default: {} })
  contributingFactors: string[];

  @Column({ type: 'jsonb', default: {} })
  rootCauses: string[];

  @Column({ default: false })
  validated: boolean;

  @Column({ nullable: true })
  validatedBy: string;

  @Column({ type: 'timestamp', nullable: true })
  validationDate: Date;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
