import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../propertyManagement/users/user.entity';
import { Repository } from 'typeorm';
import getHashedPassword from './helpers/getHashedPassword';
import { CreateUserDto } from 'src/propertyManagement/users/dto/CreateUserDto';

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

        const hashedPassword = await getHashedPassword(password);

        const payloadForDatabase = {
            email,
            password: hashedPassword,
            firstName,
            lastName,
        };

        const user = this.usersRepository.create(payloadForDatabase);

        await this.usersRepository.save(user);

        const payloadForJwt = {
            email,
            role: 'user',
            id: user.id,
            firstName,
            lastName,
        };

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

        const payloadForJwt = {
            email,
            role: 'user',
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        return {
            access_token: await this.jwtService.signAsync(payloadForJwt),
            user: payloadForJwt,
        };
    }

    async updateSelf(id: number, { firstName, lastName, email, password }: Partial<CreateUserDto>) {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (firstName) {
            user.firstName = firstName;
        }

        if (lastName) {
            user.lastName = lastName;
        }

        if (email) {
            user.email = email;
        }

        if (password) {
            user.password = await getHashedPassword(password);
        }

        await this.usersRepository.update(id, user);

        const payloadForJwt = {
            email: user.email,
            role: 'user',
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        return {
            access_token: await this.jwtService.signAsync(payloadForJwt),
            user: payloadForJwt,
        };
    }
}
