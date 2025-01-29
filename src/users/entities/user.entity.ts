import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ColumnEntity } from '@/columns/entities/column.entity';
import { CommentEntity } from '@/comments/entities/comment.entity';
import { CardEntity } from '@/cards/entities/card.entity';
import { ApiSchema } from '@nestjs/swagger';

@ApiSchema()
@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    password: string;

    @OneToMany(() => ColumnEntity, (column) => column.user)
    columns: ColumnEntity[];

    @OneToMany(() => CardEntity, (comment) => comment.user)
    cards: CardEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
    comments: CommentEntity[];

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
}