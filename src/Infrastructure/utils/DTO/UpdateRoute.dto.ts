import { IsArray, IsOptional, IsString } from 'class-validator';
import { ICourse } from '../../../Domain';
import { RouteEntity } from 'src/Domain/entities';
import { ApiProperty } from '@nestjs/swagger';

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
