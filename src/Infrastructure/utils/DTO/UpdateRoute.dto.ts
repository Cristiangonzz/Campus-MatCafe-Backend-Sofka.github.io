import { IsArray, IsOptional, IsString } from 'class-validator';
import { RouteEntity } from '../../../Domain/entities/route.entity';
import { ICourse } from '../../../Domain/interface/course.interface';

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
