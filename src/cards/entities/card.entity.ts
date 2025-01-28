import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ColumnEntity } from '@/columns/entities/column.entity';
import { CommentEntity } from '@/comments/entities/comment.entity';
import { UserEntity } from '@/users/entities/user.entity';

@Entity({ name: 'cards' })
export class CardEntity {
    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => ColumnEntity, (column) => column.id)
    column: ColumnEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.card)
    comment: CommentEntity[];

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
}