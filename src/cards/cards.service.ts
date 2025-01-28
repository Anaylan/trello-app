
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CardEntity } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {


    constructor(
        @InjectRepository(CardEntity)
        private readonly cardsRepository: Repository<CardEntity>) { }

    async create(createCardDto: CreateCardDto): Promise<CardEntity> {
        const { userId, columnId } = createCardDto;
        const card = this.cardsRepository.create({ ...createCardDto, user: { id: userId }, column: { id: columnId } });
        return this.cardsRepository.save(card);
    }

    async findAllBy(options: FindOptionsWhere<CardEntity>): Promise<CardEntity[]> {
        const cards = await this.cardsRepository.findBy({ ...options });
        if (!cards) {
            throw new Error('Card not found');
        }
        return cards;
    }

    async findOneBy(options: FindOptionsWhere<CardEntity>): Promise<CardEntity> {
        const card = await this.cardsRepository.findOneBy({ ...options });
        if (!card) {
            throw new Error('Card not found');
        }
        return card;
    }


    async update(id: number, updateCardDto: UpdateCardDto): Promise<CardEntity> {
        const card = await this.cardsRepository.save({ ...updateCardDto, updatedAt: Date.now() });
        if (!card) {
            throw new Error('Card not found');
        }
        return card;
    }

    async remove(id: number): Promise<void> {
        const result = await this.cardsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
