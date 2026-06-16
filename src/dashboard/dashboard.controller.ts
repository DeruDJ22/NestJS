// dashboard.controller.ts - Controller untuk halaman Dashboard
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { CategoryService } from '../category/category.service.js';
import { ProductService } from '../product/product.service.js';
import { AuthGuard } from '../auth/auth.guard.js';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  // Halaman Dashboard (GET /dashboard)
  @Get()
  async index(@Req() req: any, @Res() res: any) {
    const totalCategories = await this.categoryService.count();
    const totalProducts = await this.productService.count();

    return res.render('dashboard', {
      totalCategories,
      totalProducts,
      username: req.session.username,
    });
  }
}
