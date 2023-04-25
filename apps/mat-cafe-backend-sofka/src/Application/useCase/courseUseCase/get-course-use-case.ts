import { Observable } from 'rxjs';
import { CourseEntity } from '../../../Domain/entities/course.entity';
import { ICourseDomainService } from '../../../Domain/service';

export class GetCourseUseCase {
  constructor(public readonly CourseDomainService: ICourseDomainService) {}

  execute(id: string): Observable<CourseEntity> {
    return this.CourseDomainService.getCourse(id);
  }
}
