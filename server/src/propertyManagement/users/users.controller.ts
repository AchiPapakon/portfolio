import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { ApartmentService } from '../apartments/apartments.service';
import { Apartment } from '../apartments/apartment.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly apartmentService: ApartmentService,
    ) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findOne(Number(id));
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        console.log('POST /users', createUserDto);
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
        return this.usersService.update(Number(id), updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(Number(id));
    }

    @UseGuards(AuthGuard)
    @Get(':id/apartments')
    getUserApartments(@Param('id') id: string): Promise<Apartment[]> {
        return this.apartmentService.findByUserId(Number(id));
    }
}
