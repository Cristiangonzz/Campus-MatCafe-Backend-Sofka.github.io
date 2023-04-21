import { ICalification } from '../interface';
import { CourseEntity } from './course.entity';

export class CalificationEntity implements ICalification {
  grade?: number;
  comment?: string;
  courses: CourseEntity[];

  constructor(courses: CourseEntity[], grade?: number, comment?: string) {
    this.grade = grade;
    this.comment = comment;
    this.courses = courses;
  }
}
