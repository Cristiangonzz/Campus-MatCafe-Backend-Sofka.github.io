import { Observable } from 'rxjs';
import { CourseEntity } from '../../../Domain/entities/course.entity';
import { ICourseDomainService } from '../../../Domain/service/course.service';

export class CreatecourseUseCase {
  constructor(public readonly CourseDomainService: ICourseDomainService) {}

  execute(course: CourseEntity): Observable<CourseEntity> {
    return this.CourseDomainService.createCourse(course);
  }
}
