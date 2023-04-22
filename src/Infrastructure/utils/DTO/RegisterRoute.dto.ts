import { IsNotEmpty, IsString } from 'class-validator';
import { ICourse, RouteEntity } from '../../../Domain';

export class RegisterRouteDto implements RouteEntity {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  duration: string;
  @IsString()
  @IsNotEmpty()
  courses: ICourse[];
  @IsString()
  @IsNotEmpty()
  adminId: string;
}
