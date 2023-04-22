import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ICourseDomainService, CourseEntity } from '../../../../Domain';
import { CourseRepository } from '../repository/course-repository';

@Injectable()
export class CourseServiceMongo implements ICourseDomainService {
  constructor(private readonly repositori: CourseRepository) {}

  createCourse(Course: CourseEntity): Observable<CourseEntity> {
    return this.repositori.createCourse(Course);
  }
  updateCourse(id: string, Course: CourseEntity): Observable<CourseEntity> {
    return this.repositori.updateCourse(id, Course);
  }
  deleteCourse(CourseId: string): Observable<boolean> {
    return this.repositori.deleteCourse(CourseId);
  }
  getCourse(CourseId: string): Observable<CourseEntity> {
    return this.repositori.getCourse(CourseId);
  }
  getAllCourses(): Observable<CourseEntity[]> {
    return this.repositori.getAllCourses();
  }
}