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

    async getTutor(educationLevel : number, course : string){
        // educationLevel <= 9 ? educationLevel = 9 : educationLevel = 12;
        return await this.firestoreService.findTutorsByCourse('tutor', course)
    }

    async createBooking(data : any){
        const id = await this.firestoreService.addDocument('booking', data);
        this.firestoreService.updateDocument('booking', id, { ...data, id: id, status : 0 });
        return id;
    }

    async updateBookingStatus(bookingId: string, status: number) {
        await this.firestoreService.updateDocument('booking', bookingId, { status });
    }

    async getBooking(idUser : string, role : string){
        return await this.firestoreService.findDocumentByIdTutorOrIdUser('booking', idUser, role);
    }
}
