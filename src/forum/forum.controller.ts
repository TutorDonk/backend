import { Controller, Get, UseGuards, Req, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/createForum.dto';
import { CreateCommentDto } from './dto/createComment.dto';
import { LikeForumDto } from './dto/likeForum.dto';

@ApiTags('forum')
@ApiBearerAuth()
@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getForum(@Req() req: Request) {
    const documents = await this.forumService.getAllForums();
    return documents;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({type : CreateForumDto})
  async postForum(@Req() req: Request, @Body() createForumDto: CreateForumDto) {
    const nama = req.user['0'].nama;
    const email = req.user['0'].email;
    const data = {
      ...createForumDto,
      nama,
      email,
      createdAt: new Date(),
    };
    const documentId = await this.forumService.createForum(data);
    return { id: documentId };
  }

  @Patch(':id/like')
  @UseGuards(JwtAuthGuard)
  @ApiBody({type : LikeForumDto})
  async likeForum(@Param('id') id: string, @Body('isLike') isLike : boolean) {
    const result = await this.forumService.likeForum(id, isLike);
    return result;
  }

  @Post(':id/comment')
  @UseGuards(JwtAuthGuard)
  async addComment(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const email = req.user['0'].email;
    const nama = req.user['0'].nama;
    const comment = {
      ...createCommentDto,
      nama,
      email,
      createdAt: new Date(),
    };
    const result = await this.forumService.addComment(id, comment);
    return result;
  }
}
