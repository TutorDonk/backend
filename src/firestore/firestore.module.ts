import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirestoreService } from './firestore.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    FirestoreService,
    {
      provide: 'FIRESTORE',
      useFactory: (configService: ConfigService) => {
        const adminConfig = {
          projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
          clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          privateKey: configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'), // Handle newline characters
        };
        admin.initializeApp({
          credential: admin.credential.cert(adminConfig),
        });
        return admin.firestore();
      },
      inject: [ConfigService],
    },
  ],
  exports: ['FIRESTORE', FirestoreService],
})
export class FirestoreModule {}
