import { Observable } from 'rxjs';
import { IUseCase } from 'src/Application/interface/use-case.interface';
import { AdminEntity, LearnerEntity } from 'src/Domain/entities';
import { IAdminDomainService } from 'src/Domain/service';

export class GetAdminAndLearnerEmail implements IUseCase {
  constructor(private readonly service: IAdminDomainService) {}
  execute(email: string): Observable<AdminEntity | LearnerEntity> {
    return this.service.getAdminAndLearnerEmail(email);
  }
}
