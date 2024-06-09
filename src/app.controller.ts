import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FirestoreService } from './firestore/firestore.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly firestoreService: FirestoreService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async createItem(@Body() createItemDto: any) {
    const docId = await this.firestoreService.addDocument(
      'items',
      createItemDto,
    );
    return { id: docId };
  }
}
