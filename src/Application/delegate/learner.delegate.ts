import { Observable } from 'rxjs';
import { ILearnerDomainService } from 'src/Domain/service/learner.service';
import { NotificationEventPublisher } from '../../Domain/events/notification.publisher';
import { IUseCase } from '../interface/use-case.interface';
import { SaveCalificationUseCase } from '../useCase/learner/save-calification.use-case';
import { SendWorkshopUseCase } from '../useCase/learner/sendWorkshop-use-case';
import { SubscribeRouteUseCase } from '../useCase/learner/subscribeRoute-use-case';

export class LearnerDelegate implements IUseCase {
  private delegate: IUseCase;

  constructor(
    private readonly service: ILearnerDomainService,
    private readonly publisher: NotificationEventPublisher,
  ) {}

  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toSendWorkshop(): void {
    this.delegate = new SendWorkshopUseCase(this.service, this.publisher);
  }

  toSubscribeRoute(): void {
    this.delegate = new SubscribeRouteUseCase(this.service);
  }

  toSaveCalification(): void {
    this.delegate = new SaveCalificationUseCase(this.service);
  }
}
