import { Observable } from 'rxjs';
import { CourseEntity, ICourseDomainService } from '../../../Domain';

export class CreatecourseUseCase {
  constructor(public readonly CourseDomainService: ICourseDomainService) {}

  execute(course: CourseEntity): Observable<CourseEntity> {
    return this.CourseDomainService.createCourse(course);
  }
}
