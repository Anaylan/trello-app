import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';
import { CardsService } from './cards.service';

@Module({
    imports: [TypeOrmModule.forFeature([CardEntity])],
    controllers: [CardsController],
    providers: [CardsService]
})
export class CardsModule { }
