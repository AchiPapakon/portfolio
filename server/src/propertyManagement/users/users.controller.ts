import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { ApartmentService } from '../apartments/apartments.service';
import { Apartment } from '../apartments/apartment.entity';
import { AuthGuard, Roles } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly apartmentService: ApartmentService,
    ) {}

    @UseGuards(AuthGuard)
    @Roles('admin')
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard)
    @Roles('admin')
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findOne(Number(id));
    }

    @UseGuards(AuthGuard)
    @Roles('admin')
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        console.log('POST /users', createUserDto);
        return this.usersService.create(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Roles('admin')
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
        return this.usersService.update(Number(id), updateUserDto);
    }

    @UseGuards(AuthGuard)
    @Roles('admin')
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(Number(id));
    }

    @UseGuards(AuthGuard)
    @Roles('admin')
    @Get(':id/apartments')
    getUserApartments(@Param('id') id: string): Promise<Apartment[]> {
        return this.apartmentService.findByUserId(Number(id));
    }
}
