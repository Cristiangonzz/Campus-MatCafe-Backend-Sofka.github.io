import { ICourse } from './course.interface';

export interface Calification {
  grade: number;
  comment: string;
  courses: ICourse[];
}
