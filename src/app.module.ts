import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FirestoreModule } from './firestore/firestore.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    FirestoreModule,
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
