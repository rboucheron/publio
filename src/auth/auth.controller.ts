import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body, @Res() res) {
    const { name, password } = body;
    const user = await this.authService.validateUser(name, password);

    if (!user) {
      return res.status(401).json({});
    }

    const jwt = await this.authService.login(user);

    return res.status(200).json({ jwt });
  }
}
