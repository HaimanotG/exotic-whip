import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const request = context.switchToHttp().getRequest();
        const resourcePath = request.path;
        const page = parseInt(request.query.page, 10) || 1;
        const size = parseInt(request.query.size, 10) || 10;

        const { total, data } = response;
        const limit = size;
        const totalPages = Math.ceil(total / limit);

        const pagination = {
          first: `${resourcePath}?page=1&size=${limit}`,
          prev: `${resourcePath}?page=${Math.max(page - 1, 1)}&size=${limit}`,
          next:
            page < totalPages
              ? `${resourcePath}?page=${page + 1}&size=${limit}`
              : null,
          last: `${resourcePath}?page=${totalPages}&size=${limit}`,
        };

        return {
          data,
          pagination: {
            page,
            size,
            ...pagination,
          },
        };
      }),
    );
  }
}
