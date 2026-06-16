// category.service.ts - Logika bisnis untuk Category
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Category } from './category.entity.js';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // Ambil semua category, bisa dengan pencarian
  async findAll(search?: string): Promise<Category[]> {
    if (search) {
      return this.categoryRepository.find({
        where: { name: Like(`%${search}%`) },
        order: { id: 'DESC' },
      });
    }
    return this.categoryRepository.find({ order: { id: 'DESC' } });
  }

  // Ambil satu category berdasarkan ID, beserta products-nya
  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'], // ikut ambil data products
    });

    // Error Handling: jika tidak ditemukan
    if (!category) {
      throw new NotFoundException(`Category dengan ID ${id} tidak ditemukan`);
    }

    return category;
  }

  // Buat category baru
  async create(data: Partial<Category>): Promise<Category> {
    const category = this.categoryRepository.create(data);
    return this.categoryRepository.save(category);
  }

  // Update category
  async update(id: number, data: Partial<Category>): Promise<Category> {
    const category = await this.findOne(id); // cek dulu ada atau tidak
    Object.assign(category, data);
    return this.categoryRepository.save(category);
  }

  // Hapus category
  async remove(id: number): Promise<void> {
    const category = await this.findOne(id); // cek dulu ada atau tidak
    await this.categoryRepository.remove(category);
  }

  // Hitung total category
  async count(): Promise<number> {
    return this.categoryRepository.count();
  }
}
