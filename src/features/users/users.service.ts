import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersServices {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return {
      success: true,
      users: await this.usersRepository.find({
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'role',
          'createdAt',
          'updatedAt',
        ],
      }),
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const email = createUserDto.email;
      const existingUser = await this.usersRepository.findOneBy({
        email,
      });
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      const savedUser = this.usersRepository.create({
        ...createUserDto,
      });

      const result = await this.usersRepository.save(savedUser);
      delete result.password;

      return {
        success: true,
        message: 'User registered successfully',
        data: result,
      };
    } catch (e) {
      return {
        success: false,
        message: 'Unable to register user',
        msg: e.message,
      };
    }
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      throw new BadRequestException(`Invalid Credentials`);
    }
    return user;
  }
}
