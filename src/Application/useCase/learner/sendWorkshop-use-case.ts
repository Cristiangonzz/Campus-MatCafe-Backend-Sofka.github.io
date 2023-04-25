import { Observable, map } from 'rxjs';
import { NotificationEventPublisher } from '../../../Domain/events/notification.publisher';
import { ILearnerDomainService } from '../../../Domain/service/learner.service';
import { IUseCase } from '../../interface/use-case.interface';

export class SendWorkshopUseCase implements IUseCase {
  constructor(
    private readonly service: ILearnerDomainService,
    private readonly publisher: NotificationEventPublisher,
  ) {}
  execute(
    learnedId: string,
    github: string,
    courseId: string,
    comment: string,
  ): Observable<string> {
    return this.service.sendWorkshop(learnedId, github, courseId, comment).pipe(
      map((workshop) => {
        const data = {
          id: courseId,
          github,
          learnedId,
          comment,
        };
        this.publisher.publish(courseId, data);
        return workshop;
      }),
    );
  }
}
