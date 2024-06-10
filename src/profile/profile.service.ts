import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';
import { UpdateTutorProfileDto } from 'src/auth/dto/update-tutor-profile.dto';
import { UpdateNonTutorProfileDto } from 'src/auth/dto/update-non-tutor-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async getUserProfile(email: string) {
    if (!email) {
      throw new Error('Email is required to get user profile');
    }

    const userProfile = await this.firestoreService.findDocumentByEmail('users', email);
    if (userProfile) {
      const { password, ...result } = userProfile[0];
      return result;
    } else {
      throw new Error('User not found');
    }
  }

  async createProfile(email: string, profileData: UpdateTutorProfileDto | UpdateNonTutorProfileDto, role: string) {
    if (!email) {
      throw new Error('Email is required to update user profile');
    }

    const userProfile = await this.firestoreService.findDocumentByEmail('users', email);
    if (userProfile) {
      const userId = userProfile[0].id;

      let updateData: any = { address: profileData.address };

      if (role === 'tutor') {
        updateData = {
          ...updateData,
          phoneNumber: (profileData as UpdateTutorProfileDto).phoneNumber,
          subjects: (profileData as UpdateTutorProfileDto).subjects,
          certifications: (profileData as UpdateTutorProfileDto).certifications
        };
      } else {
        updateData = {
          ...updateData,
          parentPhoneNumber: (profileData as UpdateNonTutorProfileDto).parentPhoneNumber,
          parentName: (profileData as UpdateNonTutorProfileDto).parentName,
          educationLevel: (profileData as UpdateNonTutorProfileDto).educationLevel,
          class: (profileData as UpdateNonTutorProfileDto).class
        };
      }

      await this.firestoreService.updateDocument('users', userId, updateData);
      return { message: 'Profile updated successfully' };
    } else {
      throw new Error('User not found');
    }
  }
}
