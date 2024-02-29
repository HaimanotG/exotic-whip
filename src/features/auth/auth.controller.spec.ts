import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JWTLocalStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '1h',
          },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JWTLocalStrategy],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
