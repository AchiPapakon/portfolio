import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    SetMetadata,
    ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces';
import { Reflector } from '@nestjs/core';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private reflector: Reflector,
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

            // Check if the "Roles" decorator is present
            const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

            if (requiredRoles?.length > 0 && !requiredRoles.includes(payload.role)) {
                throw new ForbiddenException(`Insufficient permissions: ${payload.role}`);
            }

            return true;
        } catch (error) {
            throw new UnauthorizedException(error instanceof Error ? error.message : 'Invalid token');
        }
    }

    private extractTokenFromCookie(request: Request): string | undefined {
        return typeof request.cookies?.auth_token === 'string' ? request.cookies.auth_token : undefined;
    }
}
