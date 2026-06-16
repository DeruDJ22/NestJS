// seed.service.ts - Service untuk data awal (seed)
import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { CategoryService } from '../category/category.service.js';
import { ProductService } from '../product/product.service.js';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  // Jalankan otomatis saat aplikasi pertama kali start
  async onModuleInit() {
    await this.seedUsers();
    await this.seedCategories();
    await this.seedProducts();
    console.log('Data awal (seed) berhasil dibuat!');
  }

  // Buat user admin default
  private async seedUsers() {
    const existingUser = await this.userService.findByUsername('admin');
    if (!existingUser) {
      await this.userService.create('admin', 'admin123');
      console.log('User admin dibuat (username: admin, password: admin123)');
    }
  }

  // Buat category contoh
  private async seedCategories() {
    const categories = await this.categoryService.findAll();
    if (categories.length === 0) {
      await this.categoryService.create({
        name: 'Elektronik',
        description: 'Peralatan elektronik dan gadget',
      });
      await this.categoryService.create({
        name: 'Makanan',
        description: 'Makanan dan minuman',
      });
      await this.categoryService.create({
        name: 'Pakaian',
        description: 'Baju, celana, dan aksesoris',
      });
      console.log('Category contoh berhasil dibuat');
    }
  }

  // Buat product contoh
  private async seedProducts() {
    const products = await this.productService.findAll();
    if (products.length === 0) {
      await this.productService.create({
        name: 'Laptop Asus',
        description: 'Laptop untuk kerja dan gaming',
        price: 8500000,
        stock: 10,
        category_id: 1,
      });
      await this.productService.create({
        name: 'Mouse Logitech',
        description: 'Mouse wireless ergonomis',
        price: 350000,
        stock: 25,
        category_id: 1,
      });
      await this.productService.create({
        name: 'Nasi Goreng Instan',
        description: 'Nasi goreng kemasan siap saji',
        price: 15000,
        stock: 100,
        category_id: 2,
      });
      await this.productService.create({
        name: 'Kaos Polos',
        description: 'Kaos polos cotton combed 30s',
        price: 75000,
        stock: 50,
        category_id: 3,
      });
      console.log('Product contoh berhasil dibuat');
    }
  }
}
