import { Injectable } from '@nestjs/common';
import { ILearnerDomainService } from 'src/Domain/service/learner.service';
import { LearnerRepository } from '../repository/learner.repository';
import { Observable } from 'rxjs';

@Injectable()
export class LearnerMongoService implements ILearnerDomainService {
  constructor(private readonly learnerRepository: LearnerRepository) {}

  sendWorkshop(
    learnedId: string,
    github: string,
    courseid: string,
  ): Observable<string> {
    return this.learnerRepository.sendWorkshop(learnedId, github, courseid);
  }
  subscribeRoute(learnerId, idRoute: string): Observable<string> {
    return this.learnerRepository.subscribeRoute(learnerId, idRoute);
  }
}
