import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @Matches(/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\d.,]+$/)
  @ApiProperty()
  name: string;

  @IsString()
  @IsEmail()
  @MinLength(5)
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  rol: boolean;
}
