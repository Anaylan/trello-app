import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { CommentsService } from './comments.service';

@Module({
    imports: [TypeOrmModule.forFeature([CommentEntity])],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule { }
