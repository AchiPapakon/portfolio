import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    Req,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import { ApartmentService } from './apartments.service';
import { Apartment } from './apartment.entity';
import { CreateApartmentDto, CreateApartmentSelfDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { AuthGuard, Roles } from '../../auth/auth.guard';
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
    @Roles('admin')
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
    async update(
        @Param('id') id: string,
        @Body() body: CreateApartmentSelfDto,
        @Req() request: Request,
    ): Promise<Apartment | null> {
        const user = request['user'] as JwtPayload;

        const apartment = await this.apartmentService.findOne(Number(id));

        if (!apartment) {
            throw new NotFoundException('Apartment not found.');
        }

        if (apartment.userId !== user.id && user.role !== 'admin') {
            throw new UnauthorizedException('You are not allowed to update this apartment.');
        }

        const payload = body as UpdateApartmentDto;
        payload.userId = apartment.userId;

        return this.apartmentService.update(Number(id), payload);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string, @Req() request: Request): Promise<void> {
        const user = request['user'] as JwtPayload;

        const apartment = await this.apartmentService.findOne(Number(id));

        if (!apartment) {
            throw new NotFoundException('Apartment not found.');
        }

        if (apartment.userId !== user.id && user.role !== 'admin') {
            throw new UnauthorizedException('You are not allowed to delete this apartment.');
        }

        return this.apartmentService.remove(Number(id));
    }
}
