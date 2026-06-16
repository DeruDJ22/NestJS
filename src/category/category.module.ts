// category.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity.js';
import { CategoryService } from './category.service.js';
import {
  CategoryController,
  CategoryApiController,
} from './category.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController, CategoryApiController],
  providers: [CategoryService],
  exports: [CategoryService], // export agar bisa dipakai module lain
})
export class CategoryModule {}
