// main.ts - File utama untuk menjalankan aplikasi NestJS
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module.js';
import session from 'express-session';

async function bootstrap() {
  // Buat aplikasi NestJS dengan tipe Express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // =============================================
  // SETUP VIEW ENGINE (V dalam MVC)
  // =============================================
  // Folder views berisi file-file EJS (template HTML)
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // Folder public untuk file CSS, JS, gambar
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // =============================================
  // SETUP SESSION (untuk fitur Login)
  // =============================================
  app.use(
    session({
      secret: 'rahasia-admin-panel', // kunci rahasia session
      resave: false,
      saveUninitialized: false,
    }),
  );

  // Jalankan di port 3000
  await app.listen(3000);
  console.log('🚀 Aplikasi berjalan di http://localhost:3000');
}
bootstrap();
