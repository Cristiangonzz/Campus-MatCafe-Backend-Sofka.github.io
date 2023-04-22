import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  firebaseId: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  photoUrl: string;
}
