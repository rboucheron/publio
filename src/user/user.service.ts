import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    pseudo: string;
    profilPicture: string;
    bio?: string;
    website?: string;
    location?: string;
    github?: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        pseudo: data.pseudo,
        profilPicture: data.profilPicture,
        bio: data.bio,
        website: data.website,
        location: data.location,
        github: data.github,
        creationDate: new Date(),
      },
    });
  }

  async findUserByName(name: string) {
    return this.prisma.user.findUnique({
      where: { name },
    });
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        Certification: true,
        Preferences: true,
        Post: true,
        Response: true,
      },
    });
  }

  async updateUser(
    id: number,
    data: {
      name?: string;
      pseudo?: string;
      profilPicture?: string;
      bio?: string;
      website?: string;
      location?: string;
      github?: string;
    },
  ) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
