import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      const savedProduct = await this.productRepository.save(product);

      return {
        success: true,
        message: 'Product created successfully',
        data: savedProduct,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create product',
        error: error.message,
      };
    }
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const result = await this.productRepository.findOneBy({ id });
    if (!result) {
      throw new NotFoundException(`Product with ${id} was not found`);
    }
    return result;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const result = await this.productRepository.update(
      { id },
      updateProductDto,
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ${id} was not found`);
    }
    return {
      success: true,
      message: `Product has been updated successfully`,
      affectedRows: result.affected,
    };
  }

  async remove(id: string) {
    const result = await this.productRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ${id} was not found`);
    }
    return {
      success: true,
      message: 'Product deleted successfully',
    };
  }
}
