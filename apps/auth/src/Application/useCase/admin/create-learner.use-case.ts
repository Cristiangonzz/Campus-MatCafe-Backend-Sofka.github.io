import { Observable } from 'rxjs';
import { LearnerEntity } from '../../../Domain/entities/';
import { IAdminDomainService } from '../../../Domain/service/admin.service';
import { IUseCase } from '../../interface/use-case.interface';
export class CreateLearnerUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}
  execute(Learner: LearnerEntity): Observable<LearnerEntity> {
    return this.service.createLearner(Learner);
  }
}
