import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendWorkshopDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  learnedId?: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  github?: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  courseid: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  coment: string;
}
