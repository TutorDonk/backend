import { ApiProperty } from '@nestjs/swagger';

interface Certification {
  name: string;
  url: string;
}

export class UpdateTutorProfileDto {
  @ApiProperty({ example: 'Jakarta Selatan' })
  domicile: string;

  @ApiProperty({ example: '0812121212' })
  phoneNumber: string;

  @ApiProperty({ example: 12 })
  educationLevel: number;

  @ApiProperty({example : 70000})
  feePerHour : number;

  @ApiProperty({ example: 'Laki-laki' })
  gender: string;

  @ApiProperty({ type: ['Matematika', 'IPA'] })
  subjects: string[];

  @ApiProperty({ type: ['Object'], example: [
    { name: 'certif1', url: 'https://certif1' },
    { name: 'certif2', url: 'https://certif2' },
], })
  certifications: Certification[];
}
