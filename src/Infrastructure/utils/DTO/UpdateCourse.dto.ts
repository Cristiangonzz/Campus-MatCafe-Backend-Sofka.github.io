import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';
import { CourseEntity } from 'src/Domain/entities';

export class UpdateCourseDto implements CourseEntity {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  duration: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  requirements: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  content: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  adminId: string;
}
