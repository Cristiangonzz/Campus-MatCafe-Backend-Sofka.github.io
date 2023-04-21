import { Observable } from 'rxjs';
import { LearnerEntity } from '../entities/learner.entity';
import { AdminEntity } from '../entities/admin.entity';

export interface IAdminDomainService {
  createLearner(Learner: LearnerEntity): Observable<LearnerEntity>;
  createAdmin(Admin: AdminEntity): Observable<AdminEntity>;
}
