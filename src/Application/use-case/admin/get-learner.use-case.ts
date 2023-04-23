import { Observable } from 'rxjs';
import { IAdminDomainService } from '../../../Domain/service/admin.service';
import { IUseCase } from '../../interface/use-case.interface';
import { LearnerEntity } from 'src/Domain/entities';

export class GetLearnerByEmailUseCase implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}

  execute(email: string): Observable<LearnerEntity> {
    return this.service.getLearnerByEmail(email);
  }
}
