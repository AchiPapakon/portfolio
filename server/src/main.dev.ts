import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

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

    app.useWebSocketAdapter(new WsAdapter(app));

    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
void bootstrap();
