import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { QualityPlan } from './quality-plan.entity';
import { InspectionCharacteristic } from './inspection-characteristic.entity';

@Entity('inspection_plan')
export class InspectionPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => QualityPlan, plan => plan.inspectionPlans)
  @JoinColumn({ name: 'plan_id' })
  plan: QualityPlan;

  @OneToMany(() => InspectionCharacteristic, characteristic => characteristic.inspectionPlan)
  inspectionCharacteristics: InspectionCharacteristic[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
