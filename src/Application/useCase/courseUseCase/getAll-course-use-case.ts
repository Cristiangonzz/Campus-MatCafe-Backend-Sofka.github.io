import { Observable } from 'rxjs';
import { ICourseDomainService } from '../../../Domain/service';
import { CourseEntity } from '../../../Domain';

export class GetAllCourseUseCase {
  constructor(public readonly CourseDomainService: ICourseDomainService) {}

  execute(): Observable<CourseEntity[]> {
    return this.CourseDomainService.getAllCourses();
  }
}
