import { ApiProperty } from "@nestjs/swagger";

export class SearchTutorDto{
    @ApiProperty({example : 'IPA'})
    course : string
}