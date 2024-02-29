import { Injectable } from '@nestjs/common';
import { UsersServices } from '../users/users.service';
import { User } from '../users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersServices,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    return this.usersService.validateUser(email, password);
  }

  login(user: User) {
    const payload = { email: user?.email, sub: user?.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
}
