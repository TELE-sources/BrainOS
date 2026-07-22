import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('test_method')
export class TestMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100 })
  standardReference: string;

  @Column()
  measurementUnit: string;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  detectionLimit: number;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  quantitationLimit: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
