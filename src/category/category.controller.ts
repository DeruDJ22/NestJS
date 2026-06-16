// category.controller.ts - Controller untuk halaman Category dan API
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Res,
  Req,
  UseGuards,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service.js';
import { AuthGuard } from '../auth/auth.guard.js';

// ============================================
// HALAMAN (VIEW) - Render Page / MVC Pattern
// ============================================
@Controller('categories')
@UseGuards(AuthGuard) // Semua halaman harus login dulu
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Halaman List Category (GET /categories)
  @Get()
  async index(
    @Query('search') search: string,
    @Req() req: any,
    @Res() res: any,
  ) {
    const categories = await this.categoryService.findAll(search);
    return res.render('categories/index', {
      categories,
      search: search || '',
      username: req.session.username,
    });
  }

  // Halaman Form Tambah Category (GET /categories/create)
  @Get('create')
  async createForm(@Req() req: any, @Res() res: any) {
    return res.render('categories/form', {
      category: null,
      username: req.session.username,
    });
  }

  // Proses Tambah Category (POST /categories)
  @Post()
  async create(
    @Body() body: { name: string; description: string },
    @Res() res: any,
  ) {
    await this.categoryService.create(body);
    return res.redirect('/categories');
  }

  // Halaman Detail Category (GET /categories/:id)
  @Get(':id')
  async detail(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Res() res: any,
  ) {
    try {
      const category = await this.categoryService.findOne(id);
      return res.render('categories/detail', {
        category,
        username: req.session.username,
      });
    } catch (error) {
      return res.status(404).render('error', {
        statusCode: 404,
        message: `Category dengan ID ${id} tidak ditemukan`,
      });
    }
  }

  // Halaman Form Edit Category (GET /categories/:id/edit)
  @Get(':id/edit')
  async editForm(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Res() res: any,
  ) {
    try {
      const category = await this.categoryService.findOne(id);
      return res.render('categories/form', {
        category,
        username: req.session.username,
      });
    } catch (error) {
      return res.status(404).render('error', {
        statusCode: 404,
        message: `Category dengan ID ${id} tidak ditemukan`,
      });
    }
  }

  // Proses Update Category (POST /categories/:id/update)
  @Post(':id/update')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string; description: string },
    @Res() res: any,
  ) {
    await this.categoryService.update(id, body);
    return res.redirect('/categories');
  }

  // Proses Hapus Category (POST /categories/:id/delete)
  @Post(':id/delete')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: any,
  ) {
    await this.categoryService.remove(id);
    return res.redirect('/categories');
  }
}

// ============================================
// API CONTROLLER - Return JSON (untuk Postman)
// ============================================
@Controller('api/categories')
export class CategoryApiController {
  constructor(private readonly categoryService: CategoryService) {}

  // GET /api/categories
  @Get()
  async findAll(@Query('search') search: string) {
    const data = await this.categoryService.findAll(search);
    return { success: true, data };
  }

  // GET /api/categories/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.categoryService.findOne(id);
    return { success: true, data };
  }

  // POST /api/categories
  @Post()
  async create(@Body() body: { name: string; description: string }) {
    const data = await this.categoryService.create(body);
    return { success: true, message: 'Category berhasil ditambahkan', data };
  }

  // PUT /api/categories/:id
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string; description: string },
  ) {
    const data = await this.categoryService.update(id, body);
    return { success: true, message: 'Category berhasil diupdate', data };
  }

  // DELETE /api/categories/:id
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.remove(id);
    return { success: true, message: 'Category berhasil dihapus' };
  }
}
