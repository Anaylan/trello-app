import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.create({ email, password: hashedPassword });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findOneBy({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
