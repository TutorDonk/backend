import { Controller, Get, UseGuards, Req, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/createForum.dto';
import { CreateCommentDto } from './dto/createComment.dto';

@ApiTags('forum')
@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getForum(@Req() req: Request) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
  async likeForum(@Param('id') id: string) {
    const result = await this.forumService.likeForum(id);
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
