import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

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
  @Matches(/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\d.,]+$/)
  @ApiProperty()
  coment: string;
}
