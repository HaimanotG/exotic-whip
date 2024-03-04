import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDTO } from './dto/find-product.dto';
import {
  Pagination,
  PaginationParams,
} from 'src/core/decorators/pagination-params.decorator';
import { Sort, SortParams } from 'src/core/decorators/sort-params.decorator';
import {
  Filter,
  FilterParams,
} from 'src/core/decorators/filter-params.decorator';
import { PaginationInterceptor } from 'src/core/interceptors/pagination.interceptor';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query: FindProductDTO) {
    return this.productsService.findAll(query);
  }

  @Get('all')
  @UseInterceptors(PaginationInterceptor)
  getAllProducts(
    @PaginationParams() pagination: Pagination,
    @SortParams(['name']) sort?: Sort,
    @FilterParams(['name', 'price']) filter?: Filter,
  ) {
    return this.productsService.getAllProducts(pagination, sort, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
