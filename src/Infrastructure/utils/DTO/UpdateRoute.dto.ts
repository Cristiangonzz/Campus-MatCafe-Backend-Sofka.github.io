import { IsArray, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { RouteEntity } from 'src/Domain/entities';

export class UpdateRouteDto implements RouteEntity {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;
  @IsString()
  @IsOptional()
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
  adminId: string;
}
