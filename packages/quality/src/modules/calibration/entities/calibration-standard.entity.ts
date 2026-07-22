import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
  Unique,
} from 'typeorm';
import { Calibration } from './calibration.entity';
import { StandardType, StandardStatus } from '../../../common/enums';

@Entity('calibration_standard')
@Index(['code'])
@Unique(['code'])
export class CalibrationStandard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: StandardType })
  type: StandardType;

  @Column({ type: 'enum', enum: StandardStatus, default: StandardStatus.ACTIVE })
  status: StandardStatus;

  @Column({ type: 'jsonb', default: {} })
  properties: Record<string, any>;

  @OneToMany(() => Calibration, calibration => calibration.standard)
  calibrations: Calibration[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
