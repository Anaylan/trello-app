import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { SignInUserDto } from '@/users/dto/signin-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(data: CreateUserDto): Promise<{ accessToken: string }> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.usersService.create({ ...data, password: hashedPassword });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { id: user.id, email: user.email };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async login(data: SignInUserDto): Promise<{ accessToken: string }> {
        const user = await this.usersService.findOneBy({ email: data.email });
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { id: user.id, email: user.email };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
