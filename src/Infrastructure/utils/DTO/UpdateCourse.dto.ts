import { IsString, IsArray, IsOptional } from 'class-validator';
import { CourseEntity } from '../../../Domain';

export class UpdateCourseDto implements CourseEntity {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  duration: string;

  @IsString()
  @IsOptional()
  requirements: string;

  @IsArray()
  @IsOptional()
  content: string[];

  @IsString()
  @IsOptional()
  adminId: string;
}
