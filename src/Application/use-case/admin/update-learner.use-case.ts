import { Observable } from 'rxjs';
import { IAdminDomainService } from '../../../Domain/service/admin.service';
import { IUseCase } from '../../interface/use-case.interface';
import { LearnerEntity } from 'src/Domain/entities';
export class UpdateLearnerUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}

  execute(email: string, Learner: LearnerEntity): Observable<LearnerEntity> {
    return this.service.updateLearner(email, Learner);
  }
}
