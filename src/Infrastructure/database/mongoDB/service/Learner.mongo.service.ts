import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CalificationEntity } from 'src/Domain/entities';
import { ILearnerDomainService } from 'src/Domain/service/learner.service';
import { LearnerRepository } from '../repository/learner.repository';

@Injectable()
export class LearnerMongoService implements ILearnerDomainService {
  constructor(private readonly learnerRepository: LearnerRepository) {}

  sendWorkshop(
    learnedId: string,
    github: string,
    courseid: string,
    coment: string,
  ): Observable<string> {
    return this.learnerRepository.sendWorkshop(
      learnedId,
      github,
      courseid,
      coment,
    );
  }
  subscribeRoute(learnerId, idRoute: string): Observable<string> {
    return this.learnerRepository.subscribeRoute(learnerId, idRoute);
  }

  saveCalification(
    grade: number,
    comment: string,
    courseId: string,
  ): Observable<CalificationEntity> {
    return this.learnerRepository.saveCalification(grade, comment, courseId);
  }
}
