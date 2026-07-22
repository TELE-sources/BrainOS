import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LabTest } from './lab-test.entity';

@Entity('lab_test_result')
export class LabTestResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column()
  measuredValue: number;

  @Column({ length: 50 })
  unit: string;

  @Column()
  lowerSpecificationLimit: number;

  @Column()
  upperSpecificationLimit: number;

  @Column()
  isConforming: boolean;

  @ManyToOne(() => LabTest, test => test.results)
  @JoinColumn({ name: 'test_id' })
  test: LabTest;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
