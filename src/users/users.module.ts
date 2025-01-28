import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ColumnEntity } from '@/columns/entities/column.entity';
import { CardEntity } from '@/cards/entities/card.entity';
import { CommentEntity } from '@/comments/entities/comment.entity';
import { ColumnsService } from '@/columns/columns.service';
import { CardsService } from '@/cards/cards.service';
import { CommentsService } from '@/comments/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ColumnEntity, CardEntity, CommentEntity])],
  providers: [UsersService, ColumnsService, CardsService, CommentsService],
  controllers: [UsersController]
})
export class UsersModule { }
