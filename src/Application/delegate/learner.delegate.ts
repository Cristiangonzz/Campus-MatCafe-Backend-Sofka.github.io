import { Observable } from 'rxjs';
import { ILearnerDomainService } from 'src/Domain/service/learner.service';
import { IUseCase } from '../interface/use-case.interface';
import { SendWorkshopUseCase } from '../use-case/learner/sendWorkshop-use-case';
import { SubscribeRouteUseCase } from '../use-case/learner/subscribeRoute-use-case';

export class LearnerDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(private readonly service: ILearnerDomainService) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  tosendWorkshop(): void {
    this.delegate = new SendWorkshopUseCase(this.service);
  }

  toSubscribeRoute(): void {
    this.delegate = new SubscribeRouteUseCase(this.service);
  }
}
