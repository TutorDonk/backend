import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class ProfileService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async getUserProfile(email: string) {
    if (!email) {
      throw new Error('Email is required to get user profile');
    }

    const userProfile = await this.firestoreService.findDocumentByEmail(
      'users',
      email,
    );
    if (userProfile) {
      const { password, ...result } = userProfile[0];
      return result;
    } else {
      throw new Error('User not found');
    }
  }
}
