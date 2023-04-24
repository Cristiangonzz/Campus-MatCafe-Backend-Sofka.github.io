import { Observable } from 'rxjs';
import { IUseCase } from 'src/Application/interface/use-case.interface';
import { CalificationEntity } from 'src/Domain/entities';
import { IAdminDomainService } from 'src/Domain/service';

export class GradeStudentUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}

  execute(
    learnerId: string,
    calification: CalificationEntity,
  ): Observable<string> {
    return this.service.gradeStudent(learnerId, calification);
  }
}
