import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @ApiProperty({ type: 'string' })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
