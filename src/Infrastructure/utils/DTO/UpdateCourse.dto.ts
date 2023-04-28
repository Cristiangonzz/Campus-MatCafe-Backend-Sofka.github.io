import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { CourseEntity } from 'src/Domain/entities';

export class UpdateCourseDto implements CourseEntity {
  @IsString()
  @IsOptional()
  @MinLength(5)
  @ApiProperty()
  @Matches(/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\d.,]+$/)
  title: string;
  @MinLength(5)
  @IsString()
  @IsOptional()
  @Matches(/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\d.,]+$/)
  @ApiProperty()
  description: string;
  @MinLength(5)
  @IsString()
  @IsOptional()
  @ApiProperty()
  @Matches(/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\d.,]+$/)
  duration: string;
  @MinLength(5)
  @IsString()
  @IsOptional()
  @Matches(/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\d.,]+$/)
  @ApiProperty()
  requirements: string;
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
