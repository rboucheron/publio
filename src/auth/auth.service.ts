import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async findUserByName(name: string) {
    return this.prisma.user.findUnique({
      where: { name },
    });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findUserByName(username);

    if (user && (await this.comparePasswords(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { username: user.pseudo, sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  private async comparePasswords(
    providedPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(providedPassword, storedPassword);
  }
}
