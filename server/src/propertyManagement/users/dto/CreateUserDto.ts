import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(50, { message: 'First name can be at most 50 characters' })
    firstName: string;

    @IsNotEmpty()
    @MaxLength(50, { message: 'Last name can be at most 50 characters' })
    lastName: string;

    @IsEmail({}, { message: 'Please provide a valid email address' })
    @MaxLength(100, { message: 'Email can be at most 100 characters' })
    email: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    @MaxLength(255, { message: 'Password can be at most 255 characters' })
    password: string;
}
