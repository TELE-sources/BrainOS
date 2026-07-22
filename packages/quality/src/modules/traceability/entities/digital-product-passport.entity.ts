import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('digital_product_passport')
export class DigitalProductPassport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  serialNumber: string;

  @Column({ type: 'jsonb' })
  data: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
