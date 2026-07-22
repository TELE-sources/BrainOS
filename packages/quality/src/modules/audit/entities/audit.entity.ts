import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
// TODO: Add specific imports for related entities and enums

@Entity({ name: 'audit' })
export class Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // Example status enum; replace with actual enum
  @Column({ type: 'enum', enum: String })
  status: string;

  // Add other fields as per documentation

  // Relations (examples)
  // @ManyToOne(() => RelatedEntity)
  // related: RelatedEntity;

  // @OneToMany(() => ChildEntity, child => child.parent)
  // children: ChildEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
