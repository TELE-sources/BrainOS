import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { EquipmentQualification } from './equipment-qualification.entity';
import { ResultStatus } from '../../../common/enums';

@Entity('qualification_result')
@Index(['equipmentQualificationId'])
export class QualificationResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EquipmentQualification)
  equipmentQualification: EquipmentQualification;

  @Column({ type: 'enum', enum: ResultStatus, default: ResultStatus.PENDING })
  resultStatus: ResultStatus;

  @Column({ type: 'timestamp', nullable: true })
  testDate: Date;

  @Column({ nullable: true })
  testedBy: string;

  @Column({ type: 'text', nullable: true })
  observations: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
