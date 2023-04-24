import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { CourseEntity } from 'src/Domain/entities';

export class RegisterCourseDto implements CourseEntity {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  requirements: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  content: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  adminId: string;
}
