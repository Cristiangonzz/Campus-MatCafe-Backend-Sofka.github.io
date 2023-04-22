import { Observable } from 'rxjs';
import { LearnerEntity } from 'src/Domain/entities/Learner.entity';
import { AdminEntity } from 'src/Domain/entities/admin.entity';
import { IAdminDomainService } from '../../../../Domain/service/admin.service';
import { AdminRepository } from '../repository/admin.repository';

export class AdminDomainService implements IAdminDomainService {
  constructor(private readonly adminRepository: AdminRepository) {}
  getAdminByEmail(email: string): Observable<AdminEntity> {
    return this.adminRepository.getAdminByEmail(email);
  }
  getLearnerByEmail(email: string): Observable<LearnerEntity> {
    return this.adminRepository.getLernerByEmail(email);
  }
  createLearner(Learner: LearnerEntity): Observable<LearnerEntity> {
    return this.adminRepository.createLerner(Learner);
  }
  createAdmin(Admin: AdminEntity): Observable<AdminEntity> {
    return this.adminRepository.createAdmin(Admin);
  }

  updateAdmin(Admin: AdminEntity): Observable<AdminEntity> {
    return this.adminRepository.updateAdmin(Admin);
  }

  updateLearner(Learner: LearnerEntity): Observable<LearnerEntity> {
    return this.adminRepository.updateLearner(Learner);
  }
}
