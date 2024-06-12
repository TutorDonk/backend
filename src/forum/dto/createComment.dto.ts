import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto{
    @ApiProperty({description: "Add Comment Here..."})
    content : string
}