import { ApiProperty } from '@nestjs/swagger';

export class UpdateNonTutorProfileDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  parentPhoneNumber: string;

  @ApiProperty()
  parentName: string;

  @ApiProperty()
  educationLevel: string;

  @ApiProperty()
  class: string;
}
