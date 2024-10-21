import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PublicationService } from './publication.service';

@Controller('publication')
export class PublicationController {
  constructor(private publicationService: PublicationService) {}

  @Get()
  async getPublications() {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postPublication(@Request() req, @Body() body: { content: string }) {
    const userId = req.user.userId;
    const content = body.content;
    const publication = this.publicationService.createPublication(
      userId,
      content,
    );
    return { publication };
  }
}
