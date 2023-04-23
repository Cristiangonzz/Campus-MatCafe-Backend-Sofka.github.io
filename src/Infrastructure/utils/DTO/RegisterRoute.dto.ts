import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ICourse } from '../../../Domain';
import { RouteEntity } from 'src/Domain/entities';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRouteDto implements RouteEntity {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  duration: string;
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  courses: ICourse[];
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  adminId: string;
}
