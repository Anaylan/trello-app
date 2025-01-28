import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty()
    @IsEmail()
    readonly description: string;

    @ApiProperty()
    @IsNumber()
    readonly userId: number;

    @ApiProperty()
    @IsNumber()
    readonly cardId: number;
}