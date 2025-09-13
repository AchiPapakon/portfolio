import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebSocketModule } from './websocket.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const httpsOptions = {
        key: process.env.VITE_LOCALHOST_KEY?.replace(/\\n/g, '\n'),
        cert: process.env.VITE_LOCALHOST_CERT?.replace(/\\n/g, '\n'),
    };

    const nestFactoryOptions = {
        ...(process.env.NODE_ENV === 'development' && { httpsOptions }),
        cors: {
            origin: process.env.CORS_ORIGINS?.split(',') || [],
            credentials: true,
        },
    };

    const app = await NestFactory.create(AppModule, nestFactoryOptions);

    app.use(cookieParser());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    const wsApp = await NestFactory.create(WebSocketModule, nestFactoryOptions);
    wsApp.useWebSocketAdapter(new WsAdapter(wsApp));

    await Promise.all([
        app.listen(process.env.PORT ?? 3000, '0.0.0.0'),
        wsApp.listen(process.env.WS_PORT ?? 3001, '0.0.0.0'),
    ]);

    console.log(`HTTP server running on port ${process.env.PORT ?? 3000}`);
    console.log(`WebSocket server running on port ${process.env.WS_PORT ?? 3001}`);
}
void bootstrap();
