import {
  ExecutionContext,
  BadRequestException,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export interface Pagination {
  page: number;
  limit: number;
  size: number;
  offset: number;
}

export const PaginationParams = createParamDecorator(
  (_: any, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();
    const size = parseInt(req.query.size as string);
    const page = parseInt(req.query.page as string);

    if (isNaN(size) || isNaN(page) || size < 0 || page < 0) {
      throw new BadRequestException('Invalid pagination params');
    }

    if (size > 100) {
      throw new BadRequestException(
        'Invalid pagination params: size can not exceed 100',
      );
    }

    const limit = size;
    const offset = page > 0 ? (page - 1) * limit : 0;

    return {
      size,
      page,
      offset,
      limit,
    };
  },
);
