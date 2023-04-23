import { Observable } from 'rxjs';
import { CourseEntity } from 'src/Domain/entities';
import { ICourseDomainService } from 'src/Domain/service';

export class CreatecourseUseCase {
  constructor(public readonly CourseDomainService: ICourseDomainService) {}

  execute(course: CourseEntity): Observable<CourseEntity> {
    return this.CourseDomainService.createCourse(course);
  }
}
