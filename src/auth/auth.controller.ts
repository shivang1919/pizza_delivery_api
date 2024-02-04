import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService ) {}

    @Post('/sign-up')
    signUp(@Body() SignUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(SignUpDto);
    }

    @Get('/login')
    LogIn(@Body() LoginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(LoginDto);
    }
}