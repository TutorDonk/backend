import { ApiProperty } from "@nestjs/swagger";

export class LikeForumDto {
    @ApiProperty({ example: true})
    isLike: boolean;
  }