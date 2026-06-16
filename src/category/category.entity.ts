// category.entity.ts - Model untuk tabel categories
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../product/product.entity.js';

@Entity('categories') // nama tabel di database
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relasi: Satu Category punya banyak Product (One-to-Many)
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
