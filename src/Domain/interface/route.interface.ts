import { ICourse } from './course.interface';

export interface IRoute {
  title: string;
  description: string;
  duration: string;
  courses: ICourse[];
  adminId: string;
}
