import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ApartmentsModule } from '../apartments/apartments.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), ApartmentsModule, AuthModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
