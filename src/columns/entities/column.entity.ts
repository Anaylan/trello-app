import { CardEntity } from '@/cards/entities/card.entity';
import { UserEntity } from '@/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('columns')
export class ColumnEntity {
    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id: number;

    @Column()
    name: string;

    @Column({ type: "text" })
    description: string;

    @ManyToOne(() => UserEntity, (user) => user.columns, { onDelete: "CASCADE" })
    user: UserEntity;

    @OneToMany(() => CardEntity, (card) => card.column)
    card: CardEntity[];

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
}