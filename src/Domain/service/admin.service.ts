import { Observable } from 'rxjs';
import { LearnerEntity } from '../entities/learner.entity';

export interface AdminDomainService {
  createLearner(Learner: LearnerEntity): Observable<LearnerEntity>;
}
