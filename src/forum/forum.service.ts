import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class ForumService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async getAllForums() {
    return this.firestoreService.getAllDocuments('forums');
  }

  async createForum(data: any) {
    return this.firestoreService.addDocument('forums', data);
  }

  async likeForum(forumId: string) {
    const forum = await this.firestoreService.getDocument('forums', forumId);
    if (!forum) {
      throw new Error('Forum not found');
    }
    const likes = forum.likes ? forum.likes + 1 : 1;
    await this.firestoreService.updateDocument('forums', forumId, { likes });
    return { likes };
  }

  async addComment(forumId: string, comment: any) {
    const forum = await this.firestoreService.getDocument('forums', forumId);
    if (!forum) {
      throw new Error('Forum not found');
    }
    const comments = forum.comments ? [...forum.comments, comment] : [comment];
    await this.firestoreService.updateDocument('forums', forumId, { comments });
    return { comments };
  }
}
