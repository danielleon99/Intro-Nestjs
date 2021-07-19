import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from '../users/user.service';


@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(userName: string, pass: string) {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const user = await this.userService.getUserByName(userName);

        if (user && (await compare(pass, user.password))) {

            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { userName: user.userName, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
