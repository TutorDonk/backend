import { ApiProperty } from "@nestjs/swagger";

export class CreateForumDto{
    @ApiProperty({ description: 'Title of the forum post' })
    title : string;
    @ApiProperty({example : ['Math', 'Physics']})
    tag : string[];
    @ApiProperty({ description: 'Content of the forum post' })
    content : string;
}