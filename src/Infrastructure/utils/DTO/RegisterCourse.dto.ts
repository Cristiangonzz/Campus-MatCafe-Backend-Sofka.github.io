import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsMongoId,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';
import { CourseEntity } from 'src/Domain/entities';

export class RegisterCourseDto implements CourseEntity {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @Matches(/^[A-Za-zñÑ\s]+$/)
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @Matches(/^[A-Za-zñÑ\s\d]+$/)
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Matches(/^[A-Za-zñÑ\s\d]+$/)
  @MinLength(5)
  duration: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(5)
  @Matches(/^[A-Za-zñÑ\s\d]+$/)
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

  @IsString()
  @IsOptional()
  @ApiProperty()
  url?: string;
}
