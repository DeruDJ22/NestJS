// product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity.js';
import { ProductService } from './product.service.js';
import {
  ProductController,
  ProductApiController,
} from './product.controller.js';
import { CategoryModule } from '../category/category.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoryModule, // import agar ProductController bisa pakai CategoryService
  ],
  controllers: [ProductController, ProductApiController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
