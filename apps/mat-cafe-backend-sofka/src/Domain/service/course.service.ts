import { Observable } from 'rxjs';
import { CourseEntity } from '../entities/course.entity';

export interface ICourseDomainService {
  createCourse(Course: CourseEntity): Observable<CourseEntity>;
  updateCourse(Id: string, Course: CourseEntity): Observable<CourseEntity>;
  deleteCourse(CourseId: string): Observable<boolean>;
  getCourse(CourseId: string): Observable<CourseEntity>;
  getAllCourses(): Observable<CourseEntity[]>;
}
