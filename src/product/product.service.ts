// product.service.ts - Logika bisnis untuk Product
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './product.entity.js';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Ambil semua product, bisa dengan pencarian
  async findAll(search?: string): Promise<Product[]> {
    if (search) {
      return this.productRepository.find({
        where: { name: Like(`%${search}%`) },
        relations: ['category'], // ikut ambil data category
        order: { id: 'DESC' },
      });
    }
    return this.productRepository.find({
      relations: ['category'],
      order: { id: 'DESC' },
    });
  }

  // Ambil satu product berdasarkan ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'], // ikut ambil data category
    });

    // Error Handling: jika tidak ditemukan
    if (!product) {
      throw new NotFoundException(`Product dengan ID ${id} tidak ditemukan`);
    }

    return product;
  }

  // Buat product baru
  async create(data: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  // Update product
  async update(id: number, data: Partial<Product>): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, data);
    return this.productRepository.save(product);
  }

  // Hapus product
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  // Hitung total product
  async count(): Promise<number> {
    return this.productRepository.count();
  }
}
