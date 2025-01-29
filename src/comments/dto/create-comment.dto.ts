import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty()
    @IsString()
    readonly description: string;

    @ApiProperty()
    @IsNumber()
    readonly userId: number;

    @ApiProperty()
    @IsNumber()
    readonly cardId: number;
}