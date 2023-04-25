import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsMongoId,
  MinLength,
} from 'class-validator';
import { CourseEntity } from 'src/Domain/entities';

export class RegisterCourseDto implements CourseEntity {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(5)
  duration: string;

  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(5)
  requirements: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  content: string[];

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  adminId: string;
}
