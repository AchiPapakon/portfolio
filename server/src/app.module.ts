import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './propertyManagement/users/users.module';
import { ApartmentsModule } from './propertyManagement/apartments/apartments.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true,
            cache: true,
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            autoLoadEntities: true,
            synchronize: true, // TODO: false for production
        }),
        // Jane Doe application
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', '..', 'frontend-apps', 'jane-doe', 'dist'),
            serveRoot: '/portfolio/jane-doe',
            serveStaticOptions: {
                index: ['index.html'],
            },
        }),
        // Property Management application
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', '..', 'frontend-apps', 'property-management', 'dist'),
            serveRoot: '/portfolio/property-management',
            serveStaticOptions: {
                index: ['index.html'],
            },
        }),
        // Schedules application
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', '..', 'frontend-apps', 'schedules', 'dist'),
            serveRoot: '/schedules',
            serveStaticOptions: {
                index: ['index.html'],
            },
        }),
        // Main portfolio SPA application at root (it has to be last!)
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', '..', 'frontend-apps', 'portfolio-spa', 'dist'),
            serveStaticOptions: {
                index: ['index.html'],
            },
        }),
        UsersModule,
        ApartmentsModule,
        AuthModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
