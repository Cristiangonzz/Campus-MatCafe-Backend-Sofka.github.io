import { Observable } from 'rxjs';
import { ICourseDomainService } from '../../../Domain/service';

export class DeleteCourseUseCase {
  constructor(public readonly CourseDomainService: ICourseDomainService) {}

  execute(id: string): Observable<boolean> {
    return this.CourseDomainService.deleteCourse(id);
  }
}
