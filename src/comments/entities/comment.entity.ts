import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
import { CardEntity } from '@/cards/entities/card.entity';
import { UserEntity } from '@/users/entities/user.entity';

@Entity({ name: 'comments' })
export class CommentEntity {
    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id: number;

    @Column({ type: "text" })
    description: string;

    @ManyToOne(() => CardEntity, (card) => card.id, { onDelete: "CASCADE" })
    card: CardEntity;

    @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: "CASCADE" })
    user: UserEntity;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
}