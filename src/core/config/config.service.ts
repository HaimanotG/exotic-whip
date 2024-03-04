import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from 'src/features/categories/entities/category.entity';
import { Product } from 'src/features/products/entities/product.entity';
import { User } from 'src/features/users/entities/users.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.getValue('POSTGRES_URL'),
      ssl: {
        rejectUnauthorized: false, // Accept Supabase self-signed certificate
      },
      entities: [Category, Product, User],
      database: 'postgres',
      synchronize: true,
      cache: true,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_URL',
]);

export { configService };
