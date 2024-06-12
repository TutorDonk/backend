import { ApiProperty } from "@nestjs/swagger";

export class CreateForumDto{
    @ApiProperty({ description: 'Title of the forum post' })
    title : string;
    @ApiProperty({ description: 'Content of the forum post' })
    content : string;
}