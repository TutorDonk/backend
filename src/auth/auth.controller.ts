import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { RegisterPayloadDto } from './dto/register.dto';
import { ApiBody, ApiHeader, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @ApiBody({ type: RegisterPayloadDto })
  async register(@Body() registerPayloadDto: RegisterPayloadDto) {
    return await this.authService.register(registerPayloadDto);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiBody({ type: LoginDto })
  login(@Req() req: Request) {
    console.log(req)
    const user = req.user as any;
    return { message: 'login success', token: user.token, role: user.role };
  }
}
