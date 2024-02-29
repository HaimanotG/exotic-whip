import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersServices } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersServices],
  controllers: [UsersController],
  exports: [UsersServices],
})
export class UsersModule {}
