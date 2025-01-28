import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentsRepository: Repository<CommentEntity>) { }

    async create(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
        const { userId, cardId } = createCommentDto;

        const comment = this.commentsRepository.create({ ...createCommentDto, user: { id: userId }, card: { id: cardId } });
        return this.commentsRepository.save(comment);
    }

    async findOneBy(options: FindOptionsWhere<CommentEntity>): Promise<CommentEntity> {
        const comment = await this.commentsRepository.findOneBy({ ...options });
        if (!comment) {
            throw new NotFoundException(`Comment with options ${{ ...options }} not found`);
        }
        return comment
    }

    async findAllBy(options: FindOptionsWhere<CommentEntity>): Promise<CommentEntity[]> {
        const comments = await this.commentsRepository.findBy({ ...options });
        if (!comments) {
            throw new NotFoundException(`Comments with options ${{ ...options }} not found`);
        }
        return comments;
    }

    async update(id: number, updateCommentDto: UpdateCommentDto): Promise<CommentEntity> {
        const comment = await this.commentsRepository.save({ ...updateCommentDto, updatedAt: Date.now() });
        if (!comment) {
            throw new NotFoundException(`Comment not found`);
        }
        return comment;
    }

    async remove(id: number): Promise<void> {
        const result = await this.commentsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
