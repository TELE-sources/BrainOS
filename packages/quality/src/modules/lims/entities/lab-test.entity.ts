import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { LabSample } from './lab-sample.entity';
import { TestMethod } from './test-method.entity';
import { LabTestResult } from './lab-test-result.entity';

@Entity('lab_test')
export class LabTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => LabSample, sample => sample.labTests)
  @JoinColumn({ name: 'lab_sample_id' })
  sample: LabSample;

  @ManyToOne(() => TestMethod, method => method.labTests)
  @JoinColumn({ name: 'test_method_id' })
  method: TestMethod;

  @OneToMany(() => LabTestResult, result => result.test)
  results: LabTestResult[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
