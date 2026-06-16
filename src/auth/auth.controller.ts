// auth.controller.ts - Controller untuk Login dan Logout
import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  Render,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { UserService } from '../user/user.service.js';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  // Halaman Login (GET /login)
  @Get('login')
  @Render('login')
  loginPage() {
    return { error: null };
  }

  // Proses Login (POST /login)
  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Req() req: any,
    @Res() res: any,
  ) {
    const user = await this.userService.findByUsername(body.username);

    // Cek apakah user ada
    if (!user) {
      return res.render('login', { error: 'Username tidak ditemukan!' });
    }

    // Cek apakah password benar
    const isValid = await this.userService.validatePassword(
      body.password,
      user.password,
    );

    if (!isValid) {
      return res.render('login', { error: 'Password salah!' });
    }

    // Simpan data user ke session
    req.session.userId = user.id;
    req.session.username = user.username;

    // Redirect ke dashboard
    return res.redirect('/dashboard');
  }

  // Logout (GET /logout)
  @Get('logout')
  logout(@Req() req: any, @Res() res: any) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }

  // Redirect root ke login
  @Get()
  root(@Res() res: any) {
    return res.redirect('/login');
  }
}
