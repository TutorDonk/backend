import { Controller, Get, Post, Req, UseGuards, Body, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateTutorProfileDto } from 'src/profile/dto/update-tutor-profile.dto';
import { UpdateNonTutorProfileDto } from 'src/profile/dto/update-non-tutor-profile.dto';

@ApiTags('profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    const user = req.user;
    console.log('User from req:', user);
    const email = user['0']?.email;
    if (!email) {
      throw new BadRequestException('Email is missing from the user object');
    }

    try {
      const result = await this.profileService.getUserProfile(email)
      console.log("result: ", result)
      return this.profileService.getUserProfile(email);
    } catch (error) {
      throw new InternalServerErrorException('Failed to get user profile');
    }
  }

  @Post('tutor')
  @UseGuards(JwtAuthGuard)
  @ApiBody({type : UpdateTutorProfileDto
  })
  async updateProfileTutor(
    @Req() req: Request,
    @Body() updateProfileDto: UpdateTutorProfileDto
  ) {
    const user = req.user;
    console.log('User from req:', user);
    const email = user['0']?.email;
    const role = user['0']?.role;
    if (!email) {
      throw new BadRequestException('Email is missing from the user object');
    }

    try {
      return this.profileService.updateProfile(email, updateProfileDto, role);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user profile');
    }
  }

  @Post('siswa')
  @UseGuards(JwtAuthGuard)
  @ApiBody({type : UpdateNonTutorProfileDto
  })
  async updateProfile(
    @Req() req: Request,
    @Body() updateProfileDto: UpdateNonTutorProfileDto
  ) {
    const user = req.user;
    console.log('User from req:', user);
    const email = user['0']?.email;
    const role = user['0']?.role;
    if (!email) {
      throw new BadRequestException('Email is missing from the user object');
    }

    try {
      return this.profileService.updateProfile(email, updateProfileDto, role);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user profile');
    }
  }
}
