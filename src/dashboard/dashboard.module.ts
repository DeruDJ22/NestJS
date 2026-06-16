// dashboard.module.ts
import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller.js';
import { CategoryModule } from '../category/category.module.js';
import { ProductModule } from '../product/product.module.js';

@Module({
  imports: [CategoryModule, ProductModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
