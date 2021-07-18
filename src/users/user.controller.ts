import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { EditUserDto } from './dtos/edit.user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async userList() {
        return await this.userService.userList();
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.getUserById(id);
    }

    @Post()
    async createUser(@Body() userDto: CreateUserDto) {
        
        return this.userService.createUser(userDto);
    }

    @Put(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() userDto: EditUserDto) {
        
        return await this.userService.updateUser(id, userDto);
    }
   
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        
        return await this.userService.deleteUser(id);
    }
 }
