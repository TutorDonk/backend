import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirestoreModule } from './firestore/firestore.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { ForumModule } from './forum/forum.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    AuthModule,
    FirestoreModule,
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available
    }),
    ProfileModule,
    ForumModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
