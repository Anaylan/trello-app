import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>) { }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    async findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    async findOneBy(options: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
        const user = await this.usersRepository.findOneBy({ ...options });
        if (!user) {
            throw new NotFoundException(`User with options ${{ ...options }} not found`);
        }
        return user;
    }

    async findAllBy(options: FindOptionsWhere<UserEntity>): Promise<UserEntity[]> {
        const users = await this.usersRepository.findBy({ ...options });
        if (!users) {
            throw new NotFoundException(`Users with options ${{ ...options }} not found`);
        }
        return users;
    }


    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        await this.usersRepository.update(id, { ...updateUserDto, updatedAt: Date.now() });
        return this.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
