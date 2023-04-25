import { ICalification } from '../interface';

export class CalificationEntity implements ICalification {
  grade?: number;
  comment?: string;
  courseId: string;

  constructor(courseId: string, grade?: number, comment?: string) {
    this.grade = grade;
    this.comment = comment;
    this.courseId = courseId;
  }
}
