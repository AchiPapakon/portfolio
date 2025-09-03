import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebSocketModule } from './websocket.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const httpsOptions = {
        key: process.env.VITE_LOCALHOST_KEY?.replace(/\\n/g, '\n'),
        cert: process.env.VITE_LOCALHOST_CERT?.replace(/\\n/g, '\n'),
    };

    const app = await NestFactory.create(AppModule, {
        httpsOptions,
        cors: {
            origin: ['http://localhost:5173', 'https://localhost:5173'],
        },
    });

    // Enable validation using class-validator
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Remove non-whitelisted properties
            transform: true, // Transform payloads to match DTOs
            forbidNonWhitelisted: true, // Throw errors for non-whitelisted properties
            transformOptions: {
                enableImplicitConversion: true, // Auto-transform primitive types
            },
        }),
    );

    const wsApp = await NestFactory.create(WebSocketModule, {
        httpsOptions,
        cors: {
            origin: ['http://localhost:5173', 'https://localhost:5173'],
        },
    });
    wsApp.useWebSocketAdapter(new WsAdapter(wsApp));

    await Promise.all([
        app.listen(process.env.PORT ?? 3000, '0.0.0.0'),
        wsApp.listen(process.env.WS_PORT ?? 3001, '0.0.0.0'),
    ]);

    console.log(`HTTP server running on port ${process.env.PORT ?? 3000}`);
    console.log(`WebSocket server running on port ${process.env.WS_PORT ?? 3001}`);
}
void bootstrap();
