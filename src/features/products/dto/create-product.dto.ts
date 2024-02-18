import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Category } from 'src/features/categories/entities/category.entity';

export class CreateProductDto {
  @ApiProperty({ type: 'string' })
  @IsString({ message: 'Name is required' })
  @MaxLength(50, { message: 'Name can not exceed 50 characters' })
  name: string;

  @ApiProperty({ type: 'string' })
  @IsString({})
  @IsOptional()
  @MaxLength(255, { message: 'Description can not exceed 255 characters' })
  description: string;

  @ApiProperty({ type: 'string' })
  @IsNumber()
  price: number;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  stock: number;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({ type: 'string' })
  @IsString({ message: 'CategoryId is required' })
  categoryId: Category;
}
