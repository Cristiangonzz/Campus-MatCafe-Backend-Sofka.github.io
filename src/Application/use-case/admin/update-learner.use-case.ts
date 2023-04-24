import { Observable } from 'rxjs';
import { LearnerEntity } from '../../../Domain/entities/';
import { IAdminDomainService } from '../../../Domain/service/admin.service';
import { IUseCase } from '../../interface/use-case.interface';
export class UpdateLearnerUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}

  execute(email: string, Learner: LearnerEntity): Observable<LearnerEntity> {
    return this.service.updateLearner(email, Learner);
  }
}
