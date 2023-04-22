import { Observable } from 'rxjs';
import { IUseCase } from '../..';
import { CalificationEntity, IAdminDomainService } from '../../../Domain';

export class GradeStudentUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}

  execute(
    learnerId: string,
    calification: CalificationEntity,
  ): Observable<string> {
    return this.service.gradeStudent(learnerId, calification);
  }
}
