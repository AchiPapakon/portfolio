import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApartmentService } from './apartments.service';
import { Apartment } from './apartment.entity';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Controller('apartments')
export class ApartmentsController {
    constructor(private readonly apartmentService: ApartmentService) {}

    @Get()
    findAll(): Promise<Apartment[]> {
        return this.apartmentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Apartment | null> {
        return this.apartmentService.findOne(Number(id));
    }

    @Post()
    create(@Body() createApartmentDto: CreateApartmentDto): Promise<Apartment> {
        return this.apartmentService.create(createApartmentDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateApartmentDto: UpdateApartmentDto): Promise<Apartment | null> {
        return this.apartmentService.update(Number(id), updateApartmentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.apartmentService.remove(Number(id));
    }
}
