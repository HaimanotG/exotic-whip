import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export interface Sort {
  property: string;
  direction: string;
}

const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;

export const SortParams = createParamDecorator(
  (validParams, ctx: ExecutionContext): Sort => {
    const req: Request = ctx.switchToHttp().getRequest();
    const sort = req.query.sort as string;
    if (!sort) {
      return null;
    }

    if (typeof validParams !== 'object') {
      throw new BadRequestException('Invalid sort params');
    }

    if (!sort.match(sortPattern)) {
      throw new BadRequestException('Invalid sort params');
    }

    const [property, direction] = sort.split(':');

    if (!validParams.includes(property)) {
      throw new BadRequestException(`Invalid sort property: ${property}`);
    }

    return {
      property,
      direction,
    };
  },
);
