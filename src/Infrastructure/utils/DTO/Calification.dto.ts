import { CalificationEntity } from 'src/Domain/entities';

export class CalificationDto implements CalificationEntity {
  grade?: number;
  comment?: string;
  courseId: string;
  learnerId: string;
}
