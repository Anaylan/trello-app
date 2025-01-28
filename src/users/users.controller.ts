import { Body, Controller, Delete, forwardRef, Get, Inject, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserReadDto } from './dto/read-user.dto';
import { ColumnsService } from '@/columns/columns.service';
import { CommentsService } from '@/comments/comments.service';
import { CardsService } from '@/cards/cards.service';
import { OwnershipGuard } from '@/auth/guards/ownership.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
        @Inject(forwardRef(() => ColumnsService))
        private readonly columnsService: ColumnsService,
        @Inject(forwardRef(() => CardsService))
        private readonly cardsService: CardsService,
        @Inject(forwardRef(() => CommentsService))
        private readonly commentsService: CommentsService
    ) { }

    // Users
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserReadDto> {
        const user = await this.usersService.findOneBy({ id });
        return Promise.resolve(new UserReadDto(user));
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }

    @UseGuards(OwnershipGuard)
    @Get(':id/columns')
    findColumns(@Param('id', ParseIntPipe) id: number) {
        const columns = this.columnsService.findAllBy({ user: { id } });
        if (!columns) {
            throw new Error(`Columns for user ${id} not found`);
        }
        return columns;
    }

    @UseGuards(OwnershipGuard)
    @Get(':id/cards')
    findCards(@Param('id', ParseIntPipe) id: number) {
        const cards = this.cardsService.findAllBy({ user: { id } });
        if (!cards) {
            throw new Error(`Cards for user ${id} not found`);
        }
        return cards;
    }

    @UseGuards(OwnershipGuard)
    @Get(':id/comments')
    findComments(@Param('id', ParseIntPipe) id: number) {
        const comments = this.columnsService.findAllBy({ user: { id } });
        if (!comments) {
            throw new Error(`Comments for user ${id} not found`);
        }
        return comments;
    }
}
