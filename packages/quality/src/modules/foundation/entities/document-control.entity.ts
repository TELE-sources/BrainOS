import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
} from 'typeorm';
import { DocumentStatus } from '../../../common/enums';

@Entity('document_control')
@Unique(['documentNumber'])
@Index(['status'])
export class DocumentControl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  documentNumber: string;

  @Column()
  title: string;

  @Column()
  version: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: DocumentStatus })
  status: DocumentStatus;

  @Column({ type: 'timestamp' })
  effectiveDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiryDate: Date;

  @Column()
  fileReference: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
