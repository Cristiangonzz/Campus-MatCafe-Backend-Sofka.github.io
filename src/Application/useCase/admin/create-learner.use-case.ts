import { Observable } from 'rxjs';
import { IAdminDomainService } from 'src/Domain/service/admin.service';
import { LearnerEntity } from '../../../Domain/entities/';
import { IUseCase } from '../../interface/use-case.interface';
export class CreateLearnerUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}
  execute(Learner: LearnerEntity): Observable<LearnerEntity> {
    return this.service.createLearner(Learner);
  }
}
