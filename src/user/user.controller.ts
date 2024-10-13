import { UserService } from './user.service';
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      pseudo: string;
      profilPicture: string;
      bio?: string;
      website?: string;
      location?: string;
      github?: string;
    },
  ) {
    return this.userService.createUser(body);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    body: {
      name?: string;
      pseudo?: string;
      profilPicture?: string;
      bio?: string;
      website?: string;
      location?: string;
      github?: string;
    },
  ) {
    return this.userService.updateUser(Number(id), body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
