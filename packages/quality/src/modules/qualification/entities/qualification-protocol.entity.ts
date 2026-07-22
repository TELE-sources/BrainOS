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
import { ProtocolStatus } from '../../../common/enums';

@Entity('qualification_protocol')
@Index(['equipmentQualificationId'])
export class QualificationProtocol {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EquipmentQualification)
  equipmentQualification: EquipmentQualification;

  @Column()
  name: string;

  @Column()
  version: string;

  @Column({ type: 'jsonb', default: {} })
  procedures: string[];

  @Column({ type: 'jsonb', default: {} })
  acceptanceCriteria: string[];

  @Column({ type: 'enum', enum: ProtocolStatus, default: ProtocolStatus.DRAFT })
  status: ProtocolStatus;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
