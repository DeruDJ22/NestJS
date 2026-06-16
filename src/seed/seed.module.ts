// seed.module.ts
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service.js';
import { UserModule } from '../user/user.module.js';
import { CategoryModule } from '../category/category.module.js';
import { ProductModule } from '../product/product.module.js';

@Module({
  imports: [UserModule, CategoryModule, ProductModule],
  providers: [SeedService],
})
export class SeedModule {}
