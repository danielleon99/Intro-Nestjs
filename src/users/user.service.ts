import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities';
import { CreateUserDto, EditUserDto } from './dtos';
import { hashSync, genSaltSync } from 'bcryptjs';

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

    async getUserByName(userName: string) {

        const user = await this.userRepository.findOne({ userName });

        if (!user) return;

        return user;
    }

    async createUser(userDto: CreateUserDto) {

        try {
            userDto.password = hashSync(userDto.password, genSaltSync());

            const user = await this.userRepository.save(userDto);

            delete user.password;
            delete user.isActive;
            delete user.id;

            return user;
        } catch (error) {
            return error;
        }      
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
