import { Observable } from 'rxjs';
import { CalificationEntity } from '../../../Domain/entities/calification.entity';
import { IAdminDomainService } from '../../../Domain/service/admin.service';
import { IUseCase } from '../../interface/use-case.interface';

export class GradeStudentUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}

  execute(
    learnerId: string,
    calification: CalificationEntity,
  ): Observable<string> {
    return this.service.gradeStudent(learnerId, calification);
  }
}
