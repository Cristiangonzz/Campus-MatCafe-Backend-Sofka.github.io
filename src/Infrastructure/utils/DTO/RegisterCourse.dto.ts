import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CourseEntity } from '../../../Domain/entities/course.entity';

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
