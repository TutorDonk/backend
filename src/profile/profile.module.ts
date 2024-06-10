import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { FirestoreService } from 'src/firestore/firestore.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, FirestoreService],
})
export class ProfileModule {}
