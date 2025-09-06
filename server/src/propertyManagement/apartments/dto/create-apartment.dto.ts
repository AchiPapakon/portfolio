import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateApartmentSelfDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100, { message: 'City name can be at most 100 characters' })
    city: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100, { message: 'Street name can be at most 100 characters' })
    street: string;

    @IsOptional()
    @IsNumber({}, { message: 'Floor must be a number' })
    floor?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Surface must be a number' })
    surface?: number;

    @IsOptional()
    @IsString()
    @MaxLength(10, { message: 'Energy class can be at most 10 characters' })
    energyClass?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100, { message: 'Owner can be at most 100 characters' })
    owner?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100, { message: 'Tenant can be at most 100 characters' })
    tenant?: string;
}

export class CreateApartmentDto extends CreateApartmentSelfDto {
    @IsNumber({}, { message: 'User ID must be a number' })
    userId: number;
}
