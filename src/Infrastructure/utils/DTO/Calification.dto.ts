import { CalificationEntity } from '../../../Domain';

export class CalificationDto implements CalificationEntity {
  grade?: number;
  comment?: string;
  courseId: string;
  learnerId: string;
}
