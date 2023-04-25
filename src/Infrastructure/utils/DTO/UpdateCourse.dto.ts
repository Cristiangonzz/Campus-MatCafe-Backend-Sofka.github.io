import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  IsMongoId,
  MinLength,
} from 'class-validator';
import { CourseEntity } from 'src/Domain/entities';

export class UpdateCourseDto implements CourseEntity {
  @IsString()
  @IsOptional()
  @MinLength(5)
  @ApiProperty()
  title: string;
  @MinLength(5)
  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;
  @MinLength(5)
  @IsString()
  @IsOptional()
  @ApiProperty()
  duration: string;
  @MinLength(5)
  @IsString()
  @IsOptional()
  @ApiProperty()
  requirements: string;
  @MinLength(5)
  @IsArray()
  @IsOptional()
  @ApiProperty()
  content: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  @IsMongoId()
  adminId: string;
}
