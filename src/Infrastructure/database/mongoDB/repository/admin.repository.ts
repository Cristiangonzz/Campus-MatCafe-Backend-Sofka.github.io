import { InjectModel } from '@nestjs/mongoose';
import { Admin } from 'mongodb';
import { Model } from 'mongoose';
import { Observable, from } from 'rxjs';
import { AdminEntity } from 'src/Domain/entities/admin.entity';
import { LearnerEntity } from 'src/Domain/entities/learner.entity';
export class AdminRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminRepository: Model<AdminEntity>,
    @InjectModel(LearnerEntity.name)
    private readonly learnerRepository: Model<LearnerEntity>,
  ) {}

  createAdmin(admin: AdminEntity): Observable<AdminEntity> {
    return from(this.adminRepository.create(admin));
  }

  getAdminByEmail(email: string): Observable<AdminEntity> {
    return from(this.adminRepository.findOne({ email }));
  }

  createLerner(learner: LearnerEntity): Observable<LearnerEntity> {
    return from(this.learnerRepository.create(learner));
  }

  getLernerByEmail(email: string): Observable<LearnerEntity> {
    return from(this.learnerRepository.findOne({ email }));
  }

  updateAdmin(admin: AdminEntity): Observable<AdminEntity> {
    return from(
      this.adminRepository.findOneAndUpdate(
        { email: admin.email },
        { $set: admin },
        { new: true },
      ),
    );
  }

  updateLearner(learner: LearnerEntity): Observable<LearnerEntity> {
    return from(
      this.learnerRepository.findOneAndUpdate(
        { email: learner.email },
        { $set: learner },
        { new: true },
      ),
    );
  }
}
