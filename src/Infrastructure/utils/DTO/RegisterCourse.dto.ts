import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { CourseEntity } from '../../../Domain';

export class RegisterCourseDto implements CourseEntity {
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
  requirements: string;

  @IsArray()
  @IsNotEmpty()
  content: string[];

  @IsString()
  @IsNotEmpty()
  adminId: string;
}
