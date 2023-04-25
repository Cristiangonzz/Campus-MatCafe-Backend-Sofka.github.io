import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsString, IsMongoId } from 'class-validator';
import { CalificationEntity } from 'src/Domain/entities';

export class CalificationDto implements CalificationEntity {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  grade?: number;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  comment?: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  courseId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  learnerId: string;
}
