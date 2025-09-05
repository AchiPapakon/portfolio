import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './apartment.entity';
import { ApartmentService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Apartment]), AuthModule],
    controllers: [ApartmentsController],
    providers: [ApartmentService],
    exports: [ApartmentService],
})
export class ApartmentsModule {}
