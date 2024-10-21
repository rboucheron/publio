import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PublicationService {
  constructor(private readonly prisma: PrismaService) {}

  async createPublication(userId: number, content: string): Promise<any> {
    const date = new Date();
    return this.prisma.post.create({
      data: {
        userId,
        content,
        date,
      },
    });
  }
}
