import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CourseEntity } from '../../../../Domain/entities/course.entity';
import { ICourseDomainService } from '../../../../Domain/service/course.service';
import { CourseRepository } from '../repository/course-repository';

@Injectable()
export class CourseServiceMongo implements ICourseDomainService {
  constructor(private readonly repository: CourseRepository) {}

  createCourse(Course: CourseEntity): Observable<CourseEntity> {
    return this.repository.createCourse(Course);
  }
  updateCourse(id: string, Course: CourseEntity): Observable<CourseEntity> {
    return this.repository.updateCourse(id, Course);
  }
  deleteCourse(CourseId: string): Observable<boolean> {
    return this.repository.deleteCourse(CourseId);
  }
  getCourse(CourseId: string): Observable<CourseEntity> {
    return this.repository.getCourse(CourseId);
  }
  getAllCourses(): Observable<CourseEntity[]> {
    return this.repository.getAllCourses();
  }
}
