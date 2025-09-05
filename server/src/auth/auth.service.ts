import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../propertyManagement/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async register(email: string, password: string, firstName: string, lastName: string) {
        const existingUser = await this.usersRepository.findOneBy({ email });

        if (existingUser) {
            throw new ConflictException('A user with this email already exists.');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const payloadForDatabase = {
            email,
            password: hashedPassword,
            firstName,
            lastName,
        };

        const user = this.usersRepository.create(payloadForDatabase);

        await this.usersRepository.save(user);

        const payloadForJwt = { email, role: 'user', id: user.id, firstName };

        return {
            access_token: await this.jwtService.signAsync(payloadForJwt),
            user: payloadForJwt,
        };
    }

    async login(email: string, password: string) {
        const user = await this.usersRepository.findOneBy({ email });
        const errorMessage = 'Wrong username or password';

        if (!user) {
            throw new UnauthorizedException(errorMessage);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new UnauthorizedException(errorMessage);
        }

        const payloadForJwt = { email, role: 'user', id: user.id, firstName: user.firstName };

        return {
            access_token: await this.jwtService.signAsync(payloadForJwt),
            user: payloadForJwt,
        };
    }
}
