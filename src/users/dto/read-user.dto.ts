import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UserReadDto {
    @ApiProperty()
    @IsNumber()
    readonly id: number;

    @ApiProperty()
    @IsEmail()
    readonly email: string;

    constructor(entity: UserEntity) {
        this.id = entity.id;
        this.email = entity.email;
    }
}