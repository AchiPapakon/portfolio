import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromCookie(request);

        if (!token) {
            throw new UnauthorizedException('Authentication required');
        }

        try {
            const jwtSecret = this.configService.get<string>('JWT_SECRET');
            const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
                secret: jwtSecret,
            });

            // This will be visible in the route handlers
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
        return true;
    }

    private extractTokenFromCookie(request: Request): string | undefined {
        return typeof request.cookies?.auth_token === 'string' ? request.cookies.auth_token : undefined;
    }
}
