import { IsArray, IsOptional, IsString } from 'class-validator';
import { ICourse } from '../../../Domain';
import { RouteEntity } from 'src/Domain/entities';

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
