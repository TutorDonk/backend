import {Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { RegisterPayloadDto } from './dto/register.dto';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @Post('login')
    @UseGuards(LocalGuard)
    @ApiBody({ type: LoginDto })
    login(@Req() req : Request){
       return req.user
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req : Request){
        console.log(req.user)
        return req.user
    }

    @Post('register')
    @ApiBody({ type: RegisterPayloadDto })
    async register(@Body() registerPayloadDto: RegisterPayloadDto) {
        return await this.authService.register(registerPayloadDto);
    }
}
