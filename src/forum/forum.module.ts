import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { FirestoreService } from 'src/firestore/firestore.service';

@Module({
  controllers: [ForumController],
  providers: [ForumService, FirestoreService]
})
export class ForumModule {}
