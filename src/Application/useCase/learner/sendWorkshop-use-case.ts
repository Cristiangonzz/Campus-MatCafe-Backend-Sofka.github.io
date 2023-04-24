import { Observable } from 'rxjs';
import { IUseCase } from '../../interface/use-case.interface';
import { ILearnerDomainService } from '../../../Domain/service/learner.service';

export class SendWorkshopUseCase implements IUseCase {
  constructor(private readonly service: ILearnerDomainService) {}
  execute(
    learnedId: string,
    github: string,
    courseid: string,
  ): Observable<string> {
    return this.service.sendWorkshop(learnedId, github, courseid);
  }
}
