import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { ChangeRequest } from './change-request.entity';
import { ImpactArea, ImpactSeverity } from '../../../common/enums';

@Entity('change_impact_assessment')
@Index(['changeRequestId'])
@Index(['impactArea', 'impactSeverity'])
export class ChangeImpactAssessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ChangeRequest)
  changeRequest: ChangeRequest;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ImpactArea })
  impactArea: ImpactArea;

  @Column({ type: 'enum', enum: ImpactSeverity })
  impactSeverity: ImpactSeverity;

  @Column({ type: 'jsonb', default: {} })
  affectedSystems: string[];

  @Column({ type: 'jsonb', default: {} })
  affectedProcesses: string[];

  @Column({ type: 'text', nullable: true })
  mitigationPlan: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
