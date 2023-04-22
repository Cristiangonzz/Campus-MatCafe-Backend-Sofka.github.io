import { ICourse } from './course.interface';

export interface ICalification {
  grade?: number;
  comment?: string;
  courses: ICourse[];
}
