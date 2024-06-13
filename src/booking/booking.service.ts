import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class BookingService {
    constructor(private readonly firestoreService: FirestoreService) {}

    async getCourses(educationLevel : number){
        educationLevel <= 9 ? educationLevel = 9 : educationLevel = 12;
        const courses = await this.firestoreService.getDocument('courses', educationLevel.toString());
        return courses.pelajaran;
    }
}
