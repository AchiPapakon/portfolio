import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './apartment.entity';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Injectable()
export class ApartmentService {
    constructor(
        @InjectRepository(Apartment)
        private apartmentRepository: Repository<Apartment>,
    ) {}

    findAll(): Promise<Apartment[]> {
        return this.apartmentRepository.find();
    }

    findOne(id: number): Promise<Apartment | null> {
        return this.apartmentRepository.findOneBy({ id });
    }

    findByUserId(userId: number): Promise<Apartment[]> {
        return this.apartmentRepository.findBy({ userId });
    }

    async create(createApartmentDto: CreateApartmentDto): Promise<Apartment> {
        const apartment = this.apartmentRepository.create(createApartmentDto);
        return this.apartmentRepository.save(apartment);
    }

    async update(id: number, updateApartmentDto: UpdateApartmentDto): Promise<Apartment | null> {
        await this.apartmentRepository.update(id, updateApartmentDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.apartmentRepository.delete(id);
    }
}
