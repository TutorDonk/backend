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

  async updateDocument(collection: string, id: string, data: any) {
    await this.firestore.collection(collection).doc(id).update(data);
  }

  async findDocumentByEmail(collection : string, email : string) : Promise<any>{
    const querySnapshot = await this.firestore.collection(collection).where('email', '==', email).get();
    if (querySnapshot.empty) {
      return null;
    }
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getTotalDocuments(collection: string) {
    const querySnapshot = await this.firestore.collection(collection).get();
    return querySnapshot.size;
  }

  // Additional methods for interacting with Firestore can be added here
}
