import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InspectionOperation } from './inspection-operation.entity';

@Entity('inspection_result')
export class InspectionResult {
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

  @ManyToOne(() => InspectionOperation, operation => operation.inspectionResults)
  @JoinColumn({ name: 'inspection_operation_id' })
  inspectionOperation: InspectionOperation;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
