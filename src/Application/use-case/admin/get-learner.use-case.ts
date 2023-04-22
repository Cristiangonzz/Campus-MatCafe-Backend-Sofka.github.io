import { Observable } from 'rxjs';
import { LearnerEntity } from '../../../Domain/entities/Learner.entity';
import { IAdminDomainService } from '../../../Domain/service/admin.service';
import { IUseCase } from '../../interface/use-case.interface';

export class GetLearnerByEmailUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}

  execute(email: string): Observable<LearnerEntity> {
    return this.service.getLearnerByEmail(email);
  }
}
