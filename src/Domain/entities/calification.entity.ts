import { ICalification } from '../interface';
import { Course } from './course.entity';

export class Calification implements ICalification {
  grade?: number;
  comment?: string;
  courses: Course[];

  constructor(courses: Course[], grade?: number, comment?: string) {
    this.grade = grade;
    this.comment = comment;
    this.courses = courses;
  }
}
