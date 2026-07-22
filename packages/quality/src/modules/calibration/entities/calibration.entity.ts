import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { InspectionEquipment } from '../../inspection/entities/inspection-equipment.entity';
import { CalibrationStandard } from './calibration-standard.entity';
import { CalibrationType, CalibrationStatus } from '../../../common/enums';

@Entity('calibration')
@Index(['equipmentId', 'calibrationDate'])
@Index(['standardId'])
export class Calibration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => InspectionEquipment)
  equipment: InspectionEquipment;

  @ManyToOne(() => CalibrationStandard)
  standard: CalibrationStandard;

  @Column({ type: 'enum', enum: CalibrationType })
  type: CalibrationType;

  @Column({ type: 'enum', enum: CalibrationStatus, default: CalibrationStatus.SCHEDULED })
  status: CalibrationStatus;

  @Column({ type: 'timestamp' })
  calibrationDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  nextCalibrationDate: Date;

  @Column({ type: 'jsonb', default: {} })
  results: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  certificates: string[];

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
