import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

@ApiTags('booking')
@ApiBearerAuth()
@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService : BookingService) {}

    @Get('/pelajaran')
    @UseGuards(JwtAuthGuard)
    async getAllCourses(@Req() req: Request) {
      const educationLevel = req.user['0'].educationLevel
      return await this.bookingService.getCourses(educationLevel);
    }
}
