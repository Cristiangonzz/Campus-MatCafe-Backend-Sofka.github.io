import { CalificationEntity } from '../../../Domain/entities/calification.entity';

export class CalificationDto implements CalificationEntity {
  grade?: number;
  comment?: string;
  courseId: string;
  learnerId: string;
}
