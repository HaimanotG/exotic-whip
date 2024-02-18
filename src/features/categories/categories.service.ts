import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoriesRepository.create(createCategoryDto);
      const savedCategory = await this.categoriesRepository.save(category);
      
      return {
        success: true,
        message: 'Category created successfully',
        data: savedCategory,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create category',
        error: error.message,
      };
    }
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  async findOne(id: string) {
    const result = await this.categoriesRepository.findOneBy({ id })
    if (!result) {
      throw new NotFoundException(`Category with id ${id} was not found.`);
    }
    return result;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const result = await this.categoriesRepository.update({ id }, updateCategoryDto);
  
      if (result.affected === 0) {
        throw new NotFoundException(`Category with id ${id} was not found.`);
      }
  
      return {
        message: 'Category updated successfully',
        affectedRows: result.affected,
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    const result = await this.categoriesRepository.delete({ id })

    if (result.affected === 0) {
      throw new NotFoundException(`Category with id ${id} was not found.`);
    }
    
    return {
      success: true,
      message: "Category deleted successfully"
    };
  }
}
