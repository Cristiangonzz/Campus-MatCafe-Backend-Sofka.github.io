import { ApiProperty } from '@nestjs/swagger';
import { CalificationEntity } from 'src/Domain/entities';

export class CalificationDto implements CalificationEntity {
  @ApiProperty()
  grade?: number;
  @ApiProperty()
  comment?: string;
  @ApiProperty()
  courseId: string;
  @ApiProperty()
  learnerId: string;
}
