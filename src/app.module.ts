// app.module.ts - Module utama yang menghubungkan semua bagian aplikasi
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module.js';
import { CategoryModule } from './category/category.module.js';
import { ProductModule } from './product/product.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { SeedModule } from './seed/seed.module.js';

@Module({
  imports: [
    // =============================================
    // SETUP DATABASE SQLITE (M dalam MVC)
    // =============================================
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(__dirname, '..', 'database.sqlite'),
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: true, // Auto buat tabel (jangan pakai di production!)
    }),

    // Import semua module
    AuthModule,
    CategoryModule,
    ProductModule,
    DashboardModule,
    SeedModule,
  ],
})
export class AppModule {}
