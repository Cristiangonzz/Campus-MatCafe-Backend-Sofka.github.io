import { Observable, map } from 'rxjs';
import { CalificationEntity } from '../../../Domain/entities/calification.entity';
import { CalificationEventPublisher } from '../../../Domain/events/calification.publisher';
import { IAdminDomainService } from '../../../Domain/service/admin.service';
import { IUseCase } from '../../interface/use-case.interface';

export class GradeStudentUseCase implements IUseCase {
  constructor(
    private readonly service: IAdminDomainService,
    private readonly publish: CalificationEventPublisher,
  ) {}

  execute(
    learnerId: string,
    calification: CalificationEntity,
  ): Observable<string> {
    return this.service.gradeStudent(learnerId, calification).pipe(
      map((response) => {
        this.publish.publish(learnerId, response);
        return response;
      }),
    );
  }
}
