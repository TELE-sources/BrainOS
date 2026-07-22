import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Equipment } from '../../../../core-domain/src/entities/equipment.entity';

@Entity('equipment_genealogy')
@Index(['equipmentId'])
export class EquipmentGenealogy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Equipment)
  equipment: Equipment;

  @Column()
  equipmentNumber: string;

  @Column({ type: 'jsonb' })
  genealogyData: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
