import { ApiProperty } from '@nestjs/swagger';

export class UpdateTutorProfileDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty({ type: [String] })
  subjects: string[];

  @ApiProperty({ type: [String] })
  certifications: string[];
}
