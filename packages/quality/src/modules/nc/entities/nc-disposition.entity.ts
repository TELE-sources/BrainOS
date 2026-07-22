import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { NonConformance } from './non-conformance.entity';
import { DispositionType } from '../../../common/enums';

@Entity('nc_disposition')
@Index(['nonConformanceId'])
export class NCDisposition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => NonConformance)
  nonConformance: NonConformance;

  @Column({ type: 'enum', enum: DispositionType })
  disposition: DispositionType;

  @Column({ type: 'text', nullable: true })
  justification: string;

  @Column()
  authorizedBy: string;

  @Column({ type: 'timestamp' })
  authorizationDate: Date;

  @Column({ type: 'jsonb', default: {} })
  conditions: string[];

  @Column({ type: 'jsonb', default: {} })
  implementation: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
