import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/propertyManagement/users/dto/CreateUserDto';
import { LoginDto } from './dto/LoginDto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { JwtPayload } from './interfaces';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(201)
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const result = await this.authService.register(
            createUserDto.email,
            createUserDto.password,
            createUserDto.firstName,
            createUserDto.lastName,
        );

        this.setAuthCookie(response, result.access_token);
        return result.user;
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
        const result = await this.authService.login(loginDto.email, loginDto.password);

        this.setAuthCookie(response, result.access_token);
        return result.user;
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('auth_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        });
        return { message: 'Logout successful' };
    }

    @UseGuards(AuthGuard)
    @Get('check')
    checkAuth(@Req() request: Request) {
        const user = request['user'] as JwtPayload;
        return user;
    }

    private setAuthCookie(response: Response, token: string) {
        response.cookie('auth_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600000,
            path: '/',
        });
    }
}
