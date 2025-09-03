import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @MaxLength(50, { message: 'First name can be at most 50 characters' })
    firstName?: string;

    @IsOptional()
    @MaxLength(50, { message: 'Last name can be at most 50 characters' })
    lastName?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @MaxLength(100, { message: 'Email can be at most 100 characters' })
    email?: string;

    @IsOptional()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    @MaxLength(255, { message: 'Password can be at most 255 characters' })
    password?: string;
}
