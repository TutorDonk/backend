import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';
import { UpdateTutorProfileDto } from 'src/profile/dto/update-tutor-profile.dto';
import { UpdateNonTutorProfileDto } from 'src/profile/dto/update-non-tutor-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async getUserProfile(email: string) {
    if (!email) {
      throw new Error('Email is required to get user profile');
    }

    const userProfile = await this.firestoreService.findDocumentByEmail(
      'user',
      email,
    );
    const tutorProfile = await this.firestoreService.findDocumentByEmail(
      'tutor',
      email,
    );

    if (userProfile) {
      const { password, ...result } = userProfile[0];
      return result;
    } else if (tutorProfile) {
      const { password, ...result } = tutorProfile[0];
      return result;
    } else {
      throw new Error('User not found');
    }
  }

  async updateProfile(
    email: string,
    profileData: UpdateTutorProfileDto | UpdateNonTutorProfileDto,
    role: string,
  ) {
    if (!email) {
      throw new Error('Email is required to update user profile');
    }

    const collection = role === 'pengajar' ? 'tutor' : 'user';
    const userProfile = await this.firestoreService.findDocumentByEmail(
      collection,
      email,
    );
    if (userProfile) {
      const userId = userProfile[0].id;

      let updateData: any = {
        domicile: profileData.domicile,
        phoneNumber: profileData.phoneNumber,
        educationLevel: profileData.educationLevel,
        gender: profileData.gender,
      };

      if (role === 'pengajar') {
        updateData = {
          ...updateData,
          subjects: (profileData as UpdateTutorProfileDto).subjects,
          certifications: (profileData as UpdateTutorProfileDto).certifications,
        };
      } else {
        updateData = {
          ...updateData,
          parentPhoneNumber: (profileData as UpdateNonTutorProfileDto)
            .parentPhoneNumber,
          parentName: (profileData as UpdateNonTutorProfileDto).parentName,
        };
      }

      await this.firestoreService.updateDocument(
        collection,
        userId,
        updateData,
      );
      return { message: 'Profile updated successfully' };
    } else {
      throw new Error('User not found');
    }
  }
}
