import { ApiProperty } from '@nestjs/swagger';

export class RegisterPayloadDto {
  id?: string;
  @ApiProperty({ example: 'Ghaylan M Fatih' })
  nama: string;
  @ApiProperty({ example: 'user@example.com' })
  email: string;
  @ApiProperty({ example: 'password' })
  password: string;
  @ApiProperty({ example: 'pengajar / siswa' })
  role: string;
  idMLUser?: number;
  idMLTutor?: number;
}
