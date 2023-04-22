import { IsArray, IsOptional, IsString } from 'class-validator';
import { ICourse, RouteEntity } from '../../../Domain';

export class UpdateRouteDto implements RouteEntity {
  @IsString()
  @IsOptional()
  title: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsString()
  @IsOptional()
  duration: string;
  @IsString()
  @IsOptional()
  @IsArray()
  courses: ICourse[];
  @IsString()
  @IsOptional()
  adminId: string;
}
