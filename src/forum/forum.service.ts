import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class ForumService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async getAllForums() {
    return this.firestoreService.getAllDocuments('forums');
  }

  async createForum(data: any) {
    const id =  await this.firestoreService.addDocument('forums', data);
    this.firestoreService.updateDocument('forums', id, {...data, id : id})
    return id;
  }

  async likeForum(forumId: string, isLike : boolean) {
    const forum = await this.firestoreService.getDocument('forums', forumId);
    if (!forum) {
      throw new Error('Forum not found');
    }
    const likes = isLike ? 0 : 1;
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
