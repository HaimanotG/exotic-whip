import { Module } from '@nestjs/common';
import { ProductsModule } from './features/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './features/categories/categories.module';
import { configService } from './core/config/config.service';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './features/auth/auth.module';
import { JwtStrategy } from './features/auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ProductsModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
