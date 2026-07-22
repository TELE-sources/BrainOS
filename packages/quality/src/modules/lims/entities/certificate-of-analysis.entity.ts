import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LabSample } from './lab-sample.entity';

@Entity('certificate_of_analysis')
export class CertificateOfAnalysis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'timestamp' })
  issueDate: Date;

  @Column()
  issuedBy: string;

  @ManyToOne(() => LabSample, sample => sample.certificatesOfAnalysis)
  @JoinColumn({ name: 'lab_sample_id' })
  sample: LabSample;

  @Column({ type: 'jsonb' })
  testResults: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
