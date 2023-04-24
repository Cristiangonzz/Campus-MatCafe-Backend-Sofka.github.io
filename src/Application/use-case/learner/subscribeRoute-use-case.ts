import { Observable } from 'rxjs';
import { IUseCase } from '../../../Application/interface/use-case.interface';
import { ILearnerDomainService } from '../../../Domain/service/learner.service';

export class SubscribeRouteUseCase implements IUseCase {
  constructor(private readonly service: ILearnerDomainService) {}
  execute(learnerId: string, routeId: string): Observable<string> {
    return this.service.subscribeRoute(learnerId, routeId);
  }
}
