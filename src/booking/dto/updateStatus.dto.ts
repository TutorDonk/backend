import { ApiProperty } from "@nestjs/swagger";

export class UpdateStatusDto {
@ApiProperty({example : 1})
  status: number;
}