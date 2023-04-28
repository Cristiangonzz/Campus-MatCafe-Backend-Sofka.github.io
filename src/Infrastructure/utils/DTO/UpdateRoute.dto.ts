import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { RouteEntity } from 'src/Domain/entities';

export class UpdateRouteDto implements RouteEntity {
  @IsString()
  @IsOptional()
  @MinLength(5)
  @Matches(/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\d.,]+$/)
  @ApiProperty()
  title: string;
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\d.,]+$/)
  @ApiProperty()
  description: string;
  @IsString()
  @IsOptional()
  @Matches(/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\d.,]+$/)
  @MinLength(5)
  @ApiProperty()
  duration: string;
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
