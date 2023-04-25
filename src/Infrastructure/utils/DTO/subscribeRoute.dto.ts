import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class SubscribeRouteDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsMongoId()
  learnedId?: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsMongoId()
  routeid: string;
}
