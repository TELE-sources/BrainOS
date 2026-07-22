import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { QualityPhase } from './quality-phase.entity';
import { GateResult } from '../../../common/enums';

@Entity('quality_gate')
export class QualityGate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  gateDate: Date;

  @Column({ type: 'enum', enum: GateResult })
  result: GateResult;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @ManyToOne(() => QualityPhase, phase => phase.gates)
  @JoinColumn({ name: 'phase_id' })
  phase: QualityPhase;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
