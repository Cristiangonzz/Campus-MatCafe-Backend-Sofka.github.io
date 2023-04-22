import { Observable } from 'rxjs';
import { AdminEntity } from '../entities/admin.entity';
import { LearnerEntity } from '../entities/learner.entity';

export interface IAdminDomainService {
  createLearner(Learner: LearnerEntity): Observable<LearnerEntity>;
  createAdmin(Admin: AdminEntity): Observable<AdminEntity>;
  getAdminByEmail(email: string): Observable<AdminEntity>;
  getLearnerByEmail(email: string): Observable<LearnerEntity>;
  updateAdmin(Admin: AdminEntity): Observable<AdminEntity>;
  updateLearner(Learner: LearnerEntity): Observable<LearnerEntity>;
}
