import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId, MinLength } from 'class-validator';

export class SendWorkshopDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsMongoId()
  learnedId?: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  github?: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsMongoId()
  courseid: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  coment: string;
}
