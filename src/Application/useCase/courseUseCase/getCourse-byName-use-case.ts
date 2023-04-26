import { Observable } from 'rxjs';
import { CourseEntity } from 'src/Domain/entities';
import { ICourseDomainService } from 'src/Domain/service';

export class GetCourseByNameUseCase {
  constructor(public readonly CourseDomainService: ICourseDomainService) {}

  execute(name: string): Observable<CourseEntity> {
    return this.CourseDomainService.getCourseName(name);
  }
}
