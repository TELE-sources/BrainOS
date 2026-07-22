import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Equipment } from '../../../../core-domain/src/entities/equipment.entity';
import { QualificationProtocol } from './qualification-protocol.entity';
import { QualificationResult } from './qualification-result.entity';
import { QualificationType, QualificationStatus } from '../../../common/enums';

@Entity('equipment_qualification')
@Index(['equipmentId', 'qualificationType'])
export class EquipmentQualification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Equipment)
  equipment: Equipment;

  @Column({ type: 'enum', enum: QualificationType })
  qualificationType: QualificationType;

  @Column({ type: 'enum', enum: QualificationStatus, default: QualificationStatus.PLANNED })
  status: QualificationStatus;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ type: 'jsonb', default: {} })
  description: string;

  @OneToMany(() => QualificationProtocol, protocol => protocol.equipmentQualification, { cascade: true })
  protocols: QualificationProtocol[];

  @OneToMany(() => QualificationResult, result => result.equipmentQualification, { cascade: true })
  results: QualificationResult[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
