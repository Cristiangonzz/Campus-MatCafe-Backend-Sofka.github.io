import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firebaseId: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  photoUrl: string;
}
