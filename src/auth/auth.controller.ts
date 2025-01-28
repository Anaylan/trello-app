import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    signIn(@Body() signInDto: CreateUserDto) {
        return this.authService.login(signInDto.email, signInDto.password);
    }

    @Post('register')
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto.email, createUserDto.password)
    }
}
