import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LearnerEntity } from 'src/Domain/entities/Learner.entity';
import { AdminEntity } from 'src/Domain/entities/admin.entity';
import { IAdminDomainService } from '../../../../Domain/service/admin.service';
import { AdminRepository } from '../repository/admin.repository';
import { CalificationEntity } from 'src/Domain';

@Injectable()
export class AdminMongoService implements IAdminDomainService {
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

  updateAdmin(email: string, admin: AdminEntity): Observable<AdminEntity> {
    return this.adminRepository.updateAdmin(email, admin);
  }

  updateLearner(
    admin: string,
    Learner: LearnerEntity,
  ): Observable<LearnerEntity> {
    return this.adminRepository.updateLearner(admin, Learner);
  }

  gradeStudent(
    learnerId: string,
    calification: CalificationEntity,
  ): Observable<string> {
    return this.adminRepository.gradeStudent(learnerId, calification);
  }
}
