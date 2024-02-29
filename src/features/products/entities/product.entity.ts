import { Category } from 'src/features/categories/entities/category.entity';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ nullable: false })
  stock: number;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  categoryId: Category;
}
