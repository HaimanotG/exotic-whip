import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Brackets, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindProductDTO } from './dto/find-product.dto';
import { Pagination } from 'src/core/decorators/pagination-params.decorator';
import { Sort } from 'src/core/decorators/sort-params.decorator';
import { Filter } from 'src/core/decorators/filter-params.decorator';
import { PaginatedResource } from 'src/core/dtos/paginated-resource.dto';
import { getOrder, getWhere } from 'src/core/utils/type-orm-helpers';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(
    pagination: Pagination,
    sort?: Sort,
    filter?: Filter,
  ): Promise<PaginatedResource<Partial<Product>>> {
    const where = getWhere(filter);
    const order = getOrder(sort);
    const { limit, offset } = pagination;

    const [products, total] = await this.productRepository.findAndCount({
      where,
      relations: ['category'],
      ...(!!Object.keys(order) ? { order } : {}),
      take: limit,
      skip: offset,
    });

    return {
      total: total,
      data: products,
    };
  }

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

  findAll(query: FindProductDTO) {
    const { description, name, category, search } = query ?? {};
    const queryBuilder = this.productRepository.createQueryBuilder('products');
    name && queryBuilder.orWhere('products.name = :name', { name });

    if (description) {
      queryBuilder.orWhere('products.description = :description', {
        description,
      });
    }

    if (category) {
      queryBuilder.orWhere('categories.name = :category', {
        category,
      });
    }

    if (search) {
      queryBuilder.where(
        new Brackets((qb) => {
          qb.orWhere('products.name ILIKE :search', { search: `%${search}%` });
          qb.orWhere('products.description ILIKE :search', {
            search: `%${search}%`,
          });
          qb.orWhere('categories.name ILIKE :search', {
            search: `%${search}%`,
          });
          qb.orWhere('categories.description ILIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }
    return queryBuilder
      .leftJoinAndSelect('products.category', 'categories')
      .getMany();
  }

  async findOne(id: string) {
    const result = await this.productRepository.findOne({
      cache: 60000,
      where: {
        id,
      },
      relations: ['category'],
    });
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
