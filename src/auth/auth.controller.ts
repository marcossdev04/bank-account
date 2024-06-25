import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: loginDto) {
    return await this.AuthService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: registerDto) {
    return await this.AuthService.register(body);
  }
}
