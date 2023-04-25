import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { RouteEntity } from 'src/Domain/entities';

export class UpdateRouteDto implements RouteEntity {
  @IsString()
  @IsOptional()
  @MinLength(5)
  @ApiProperty()
  title: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;
  @IsString()
  @IsOptional()
  @MinLength(5)
  @ApiProperty()
  duration: string;
  @IsString()
  @IsOptional()
  @IsArray()
  @ApiProperty()
  courses: string[];
  @IsString()
  @IsOptional()
  @ApiProperty()
  @IsMongoId()
  adminId: string;
}
