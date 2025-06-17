import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';

@Module({
    imports: [
        GatewayModule,
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true,
            cache: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
