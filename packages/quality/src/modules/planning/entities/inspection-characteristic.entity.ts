import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InspectionPlan } from './inspection-plan.entity';

@Entity('inspection_characteristic')
export class InspectionCharacteristic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  targetValue: number;

  @Column()
  usl: number; // Upper Specification Limit

  @Column()
  lsl: number; // Lower Specification Limit

  @Column()
  unit: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  tolerance: number;

  @ManyToOne(() => InspectionPlan, plan => plan.inspectionCharacteristics)
  @JoinColumn({ name: 'inspection_plan_id' })
  inspectionPlan: InspectionPlan;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
