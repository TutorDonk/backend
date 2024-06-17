import { ApiProperty } from '@nestjs/swagger';

export class UpdateNonTutorProfileDto {
  @ApiProperty({
    example: 'Jakarta',
  })
  domicile: string;

  @ApiProperty({
    example: '081234567890',
  })
  phoneNumber: string;

  @ApiProperty({ example: '081234567890' })
  parentPhoneNumber: string;

  @ApiProperty({ example: 'Baskara Nugraha' })
  parentName: string;

  @ApiProperty({
    example: 10,
  })
  educationLevel: number;

  @ApiProperty({ example: 'Laki-laki' })
  gender: string;
}
