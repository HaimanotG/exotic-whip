import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersServices } from './users.service';
import { JwtGuard } from '../auth/guards/local-jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersServices) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('')
  getAllUsers() {
    return this.usersService.findAll();
  }
}
