import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ApartmentsModule } from '../apartments/apartments.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), ApartmentsModule],
    controllers: [UsersController],
    providers: [UsersService],
    // exports: [UsersService],
})
export class UsersModule {}
