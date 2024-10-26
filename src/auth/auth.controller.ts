import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body, @Res() res) {
    const { name, password } = body;

    if (!name || !password) {
      return res.status(400).send({});
    }

    const user = await this.authService.validateUser(name, password);

    if (!user) {
      return res.status(401).json({});
    }

    const jwt = await this.authService.login(user);

    return res.status(200).json({ jwt });
  }

  @Post('user/register')
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
    return this.authService.createUser(body);
  }
}
