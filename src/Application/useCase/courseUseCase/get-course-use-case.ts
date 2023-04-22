import { Observable } from 'rxjs';
import { ICourseDomainService } from '../../../Domain/service';
import { CourseEntity } from '../../../Domain';

export class GetCourseUseCase {
  constructor(public readonly CourseDomainService: ICourseDomainService) {}

  execute(id: string): Observable<CourseEntity> {
    return this.CourseDomainService.getCourse(id);
  }
}
