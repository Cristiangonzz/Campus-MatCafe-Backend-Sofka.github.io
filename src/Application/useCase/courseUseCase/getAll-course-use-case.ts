import { Observable } from 'rxjs';
import { CourseEntity } from '../../../Domain/entities/course.entity';
import { ICourseDomainService } from '../../../Domain/service';

export class GetAllCourseUseCase {
  constructor(public readonly CourseDomainService: ICourseDomainService) {}

  execute(): Observable<CourseEntity[]> {
    return this.CourseDomainService.getAllCourses();
  }
}
