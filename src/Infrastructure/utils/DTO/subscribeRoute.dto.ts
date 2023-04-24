import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SubscribeRouteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  learnedId?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  routeid: string;
}
