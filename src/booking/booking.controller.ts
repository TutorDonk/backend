import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { SearchTutorDto } from './dto/searchTutor.dto';
import { CreateBookingDto } from './dto/createBooking.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';

@ApiTags('booking')
@ApiBearerAuth()
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/pelajaran')
  @UseGuards(JwtAuthGuard)
  async getAllCourses(@Req() req: Request) {
    const educationLevel = req.user['0'].educationLevel;
    return await this.bookingService.getCourses(educationLevel);
  }

  @Get('/tutor/:course')
  @UseGuards(JwtAuthGuard)
  async getTutor(@Req() req: Request, @Param('course') course: string) {
    const educationLevel = req.user['0'].educationLevel;
    return await this.bookingService.getTutor(educationLevel, course);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getBooking(@Req() req : Request){
    const id = req.user['0'].id;
    const role = req.user['0'].id;
    return this.bookingService.getBooking(id, role)
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateBookingDto })
  async doBooking(
    @Req() req: Request,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    const idSiswa = req.user['0'].id;
    const namaSiswa = req.user['0'].nama;
    const data = {
      ...createBookingDto,
      idSiswa,
      namaSiswa,
      createdAt: new Date(),
    };
    const id = await this.bookingService.createBooking(data)
    return {id, ...data, status : 0}
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateStatusDto })
  async updateBookingStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto
  ) {
    const { status } = updateStatusDto;
    await this.bookingService.updateBookingStatus(id, status);
    return { id, status };
  }


}
