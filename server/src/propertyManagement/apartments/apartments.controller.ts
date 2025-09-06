import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { ApartmentService } from './apartments.service';
import { Apartment } from './apartment.entity';
import { CreateApartmentDto, CreateApartmentSelfDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { Request } from 'express';
import { JwtPayload } from '../../auth/interfaces';

@Controller('apartments')
export class ApartmentsController {
    constructor(private readonly apartmentService: ApartmentService) {}

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Req() request: Request): Promise<Apartment[]> {
        const user = request['user'] as JwtPayload;

        if (user.role === 'admin') {
            return this.apartmentService.findAll();
        }

        return this.apartmentService.findByUserId(user.id);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Req() request: Request): Promise<Apartment | null> {
        const user = request['user'] as JwtPayload;
        console.log(`User ${user.email} is accessing apartment ${id}`);
        return this.apartmentService.findOne(Number(id));
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() body: CreateApartmentSelfDto | CreateApartmentDto, @Req() request: Request): Promise<Apartment> {
        const user = request['user'] as JwtPayload;

        const payload = body as CreateApartmentDto;

        if ('userId' in body && body.userId !== user.id && user.role !== 'admin') {
            throw new UnauthorizedException('You are now allowed to create an apartment for another user.');
        }

        payload.userId = user.id;

        return this.apartmentService.create(payload);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateApartmentDto: UpdateApartmentDto,
        @Req() request: Request,
    ): Promise<Apartment | null> {
        const user = request['user'] as JwtPayload;
        console.log(`User ${user.email} is updating apartment ${id}`);
        return this.apartmentService.update(Number(id), updateApartmentDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Req() request: Request): Promise<void> {
        const user = request['user'] as JwtPayload;
        console.log(`User ${user.email} is deleting apartment ${id}`);
        return this.apartmentService.remove(Number(id));
    }
}
