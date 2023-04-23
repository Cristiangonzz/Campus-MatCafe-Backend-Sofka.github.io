import { Observable } from 'rxjs';
import { ICourseDomainService } from '../../../Domain/service';
import { CourseEntity } from 'src/Domain/entities';

export class GetCourseUseCase {
  constructor(public readonly CourseDomainService: ICourseDomainService) {}

  execute(id: string): Observable<CourseEntity> {
    return this.CourseDomainService.getCourse(id);
  }
}
