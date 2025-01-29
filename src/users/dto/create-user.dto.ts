import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    readonly password: string;

    @ApiProperty()
    @IsEmail()
    readonly firstname: string;

    @ApiProperty()
    @IsEmail()
    readonly lastname: string;
}