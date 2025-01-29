import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { SignInUserDto } from '@/users/dto/signin-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    signIn(@Body() signInDto: SignInUserDto) {
        return this.authService.login(signInDto);
    }

    @Post('register')
    signUp(@Body() signUpDto: CreateUserDto) {
        return this.authService.register(signUpDto)
    }
}
