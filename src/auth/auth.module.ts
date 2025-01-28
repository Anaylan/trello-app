import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from '@/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '@/users/users.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
        TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || "changeme",
            signOptions: { expiresIn: '15m' },
        })],
    providers: [AuthService, UsersService],
    controllers: [AuthController]
})
export class AuthModule { }
