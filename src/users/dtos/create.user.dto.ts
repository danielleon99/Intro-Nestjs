import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto{
    
    @Length(1, 50)
    @IsString()
    firstName: string;

    @Length(1, 50)
    @IsString()
    lastName: string;

    @Length(1, 150)
    @IsString()
    userName: string;

    @Length(1, 150)
    @IsEmail()
    @IsString()
    email: string;

    @Length(1, 50)
    @IsString()
    password: string;
}