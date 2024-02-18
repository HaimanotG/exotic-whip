import { Product } from 'src/features/products/entities/product.entity';
import { Entity, Column, OneToMany, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
