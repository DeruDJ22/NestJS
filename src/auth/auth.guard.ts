// auth.guard.ts - Guard untuk proteksi halaman (harus login dulu)
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Cek apakah user sudah login (ada session userId)
    if (request.session && request.session.userId) {
      return true; // boleh akses
    }

    // Jika belum login, redirect ke halaman login
    const response = context.switchToHttp().getResponse();
    response.redirect('/login');
    return false;
  }
}
