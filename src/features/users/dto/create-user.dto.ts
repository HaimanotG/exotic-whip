import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Role } from 'src/core/enums/roles';

export class CreateUserDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  role: Role;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @Length(6, 20)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The provided password is too weak',
  })
  password: string;
}
