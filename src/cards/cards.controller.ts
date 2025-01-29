import { OwnershipGuard } from '@/auth/guards/ownership.guard';
import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '@/auth/guards/jwt.guart';

@Controller('cards')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class CardsController {
    constructor(private readonly cardsService: CardsService) { }

    @UseGuards(OwnershipGuard)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.cardsService.remove(id);
    }

    @Post()
    async create(@Body() createCardDto: CreateCardDto) {
        return this.cardsService.create(createCardDto)
    }

    @UseGuards(OwnershipGuard)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCardDto: UpdateCardDto) {
        return this.cardsService.update(id, updateCardDto)
    }
}
