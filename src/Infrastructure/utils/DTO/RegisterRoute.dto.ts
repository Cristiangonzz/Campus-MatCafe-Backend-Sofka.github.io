import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { RouteEntity } from 'src/Domain/entities';

export class RegisterRouteDto implements RouteEntity {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  @Matches(/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\d.,]+$/)
  title: string;

  @Matches(/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\d.,]+$/)
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @Matches(/^[A-Za-zñÑáéíóúÁÉÍÓÚ\s\d.,]+$/)
  @ApiProperty()
  duration: string;
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  courses: string[];
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  adminId: string;
}
