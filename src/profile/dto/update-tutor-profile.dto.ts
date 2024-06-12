import { ApiProperty } from '@nestjs/swagger';

export class UpdateTutorProfileDto {
  @ApiProperty({ example: 'Jakarta Selatan' })
  domicile: string;

  @ApiProperty({ example: '0812121212' })
  phoneNumber: string;

  @ApiProperty({ example: 12 })
  educationLevel: number;

  @ApiProperty({ example: 'Laki-laki' })
  gender: string;

  @ApiProperty({ type: ['Matematika', 'IPA'] })
  subjects: string[];

  @ApiProperty({ type: ['Kursus 1', 'Kursus 2'] })
  certifications: string[];
}
