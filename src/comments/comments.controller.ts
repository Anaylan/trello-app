import { OwnershipGuard } from '@/auth/guards/ownership.guard';
import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '@/auth/guards/jwt.guart';

@Controller('comments')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @UseGuards(OwnershipGuard)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.commentsService.remove(id);
    }

    @Post()
    async create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.create(createCommentDto)
    }

    @UseGuards(OwnershipGuard)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.update(id, updateCommentDto)
    }
}
