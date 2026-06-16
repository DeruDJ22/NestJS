// product.controller.ts - Controller untuk halaman Product dan API
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
import { ProductService } from './product.service.js';
import { CategoryService } from '../category/category.service.js';
import { AuthGuard } from '../auth/auth.guard.js';

// ============================================
// HALAMAN (VIEW) - Render Page / MVC Pattern
// ============================================
@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  // Halaman List Product (GET /products)
  @Get()
  async index(
    @Query('search') search: string,
    @Req() req: any,
    @Res() res: any,
  ) {
    const products = await this.productService.findAll(search);
    return res.render('products/index', {
      products,
      search: search || '',
      username: req.session.username,
    });
  }

  // Halaman Form Tambah Product (GET /products/create)
  @Get('create')
  async createForm(@Req() req: any, @Res() res: any) {
    const categories = await this.categoryService.findAll();
    return res.render('products/form', {
      product: null,
      categories,
      username: req.session.username,
    });
  }

  // Proses Tambah Product (POST /products)
  @Post()
  async create(
    @Body()
    body: {
      name: string;
      description: string;
      price: number;
      stock: number;
      category_id: number;
    },
    @Res() res: any,
  ) {
    await this.productService.create(body);
    return res.redirect('/products');
  }

  // Halaman Detail Product (GET /products/:id)
  @Get(':id')
  async detail(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Res() res: any,
  ) {
    try {
      const product = await this.productService.findOne(id);
      return res.render('products/detail', {
        product,
        username: req.session.username,
      });
    } catch (error) {
      return res.status(404).render('error', {
        statusCode: 404,
        message: `Product dengan ID ${id} tidak ditemukan`,
      });
    }
  }

  // Halaman Form Edit Product (GET /products/:id/edit)
  @Get(':id/edit')
  async editForm(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Res() res: any,
  ) {
    try {
      const product = await this.productService.findOne(id);
      const categories = await this.categoryService.findAll();
      return res.render('products/form', {
        product,
        categories,
        username: req.session.username,
      });
    } catch (error) {
      return res.status(404).render('error', {
        statusCode: 404,
        message: `Product dengan ID ${id} tidak ditemukan`,
      });
    }
  }

  // Proses Update Product (POST /products/:id/update)
  @Post(':id/update')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      name: string;
      description: string;
      price: number;
      stock: number;
      category_id: number;
    },
    @Res() res: any,
  ) {
    await this.productService.update(id, body);
    return res.redirect('/products');
  }

  // Proses Hapus Product (POST /products/:id/delete)
  @Post(':id/delete')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: any,
  ) {
    await this.productService.remove(id);
    return res.redirect('/products');
  }
}

// ============================================
// API CONTROLLER - Return JSON (untuk Postman)
// ============================================
@Controller('api/products')
export class ProductApiController {
  constructor(private readonly productService: ProductService) {}

  // GET /api/products
  @Get()
  async findAll(@Query('search') search: string) {
    const data = await this.productService.findAll(search);
    return { success: true, data };
  }

  // GET /api/products/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.findOne(id);
    return { success: true, data };
  }

  // POST /api/products
  @Post()
  async create(
    @Body()
    body: {
      name: string;
      description: string;
      price: number;
      stock: number;
      category_id: number;
    },
  ) {
    const data = await this.productService.create(body);
    return { success: true, message: 'Product berhasil ditambahkan', data };
  }

  // PUT /api/products/:id
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      name: string;
      description: string;
      price: number;
      stock: number;
      category_id: number;
    },
  ) {
    const data = await this.productService.update(id, body);
    return { success: true, message: 'Product berhasil diupdate', data };
  }

  // DELETE /api/products/:id
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productService.remove(id);
    return { success: true, message: 'Product berhasil dihapus' };
  }
}
