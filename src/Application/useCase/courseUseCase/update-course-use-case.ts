import { Observable } from 'rxjs';
import { CourseEntity } from '../../../Domain/entities';
import { ICourseDomainService } from '../../../Domain/service';
export class UpdateCourseUseCase {
  constructor(public readonly CourseDomainService: ICourseDomainService) {}

  execute(id: string, Course: CourseEntity): Observable<CourseEntity> {
    return this.CourseDomainService.updateCourse(id, Course);
  }
}
