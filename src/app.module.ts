import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PublicationController } from './publication/publication.controller';
import { PublicationService } from './publication/publication.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AppController, UserController, AuthController, PublicationController],
  providers: [AppService, PrismaService, UserService, AuthService, PublicationService],
})
export class AppModule {}
