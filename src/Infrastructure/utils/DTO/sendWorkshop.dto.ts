import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

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
}
