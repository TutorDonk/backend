import { Controller, Get, Post, Req, UseGuards, Body, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { UpdateTutorProfileDto } from 'src/auth/dto/update-tutor-profile.dto';
import { UpdateNonTutorProfileDto } from 'src/auth/dto/update-non-tutor-profile.dto';

@ApiTags('profile')
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
      return this.profileService.getUserProfile(email);
    } catch (error) {
      throw new InternalServerErrorException('Failed to get user profile');
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        address: { type: 'string' },
        phoneNumber: { type: 'string' },
        subjects: { type: 'array', items: { type: 'string' } },
        certifications: { type: 'array', items: { type: 'string' } },
        parentPhoneNumber: { type: 'string' },
        parentName: { type: 'string' },
        educationLevel: { type: 'string' },
        class: { type: 'string' }
      }
    }
  })
  async createProfile(
    @Req() req: Request,
    @Body() updateProfileDto: UpdateTutorProfileDto | UpdateNonTutorProfileDto
  ) {
    const user = req.user;
    console.log('User from req:', user);
    const email = user['0']?.email;
    const role = user['0']?.role;
    if (!email) {
      throw new BadRequestException('Email is missing from the user object');
    }

    try {
      return this.profileService.createProfile(email, updateProfileDto, role);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user profile');
    }
  }
}
