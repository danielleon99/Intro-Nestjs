import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto, EditUserDto } from './dtos';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>) { }

    async userList() {
        return await this.userRepository.find();
    }

    async getUserById(id: number) {

        const user = await this.userRepository.findOne(id);

        if (!user) throw new NotFoundException(`Does not exist an user with id: ${id}`);

        return user;
    }

    async createUser(userDto: CreateUserDto) {
        
        return await this.userRepository.save(userDto);
    }

    async updateUser(id: number, userDto: EditUserDto) {

        const user = await this.userRepository.findOne(id);

        if (!user) throw new NotFoundException(`Does not exist an user with id: ${id}`);

        Object.assign(user, userDto);

        return await this.userRepository.save(user);
    }
    
    async deleteUser(id: number) {

        const user = await this.userRepository.findOne(id);

        if (!user) throw new NotFoundException(`Does not exist an user with id: ${id}`);

        return await this.userRepository.delete(user);
    }
}
