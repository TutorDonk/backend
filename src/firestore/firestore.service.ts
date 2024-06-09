import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';

@Injectable()
export class FirestoreService {
  constructor(@Inject('FIRESTORE') private firestore: Firestore) {}

  async addDocument(collection: string, data: any) {
    const docRef = await this.firestore.collection(collection).add(data);
    return docRef.id;
  }

  async getDocument(collection: string, docId: string) {
    const doc = await this.firestore.collection(collection).doc(docId).get();
    return doc.exists ? doc.data() : null;
  }

  // Additional methods for interacting with Firestore can be added here
}
