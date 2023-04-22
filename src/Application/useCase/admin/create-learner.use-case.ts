import { Observable } from 'rxjs';
import { IAdminDomainService } from 'src/Domain/service/admin.service';
import { LearnerEntity } from '../../../Domain/entities/Learner.entity';
import { IUseCase } from '../..';
export class CreateLearnerUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}
  execute(Learner: LearnerEntity): Observable<LearnerEntity> {
    return this.service.createLearner(Learner);
  }
}
