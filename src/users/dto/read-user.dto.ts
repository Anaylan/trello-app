import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UserReadDto {
    @ApiProperty()
    @IsNumber()
    readonly id: number;

    @ApiProperty()
    @IsString()
    readonly email: string;

    constructor(entity: UserEntity) {
        this.id = entity.id;
        this.email = entity.email;
    }
}