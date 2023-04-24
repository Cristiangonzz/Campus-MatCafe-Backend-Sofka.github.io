import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Observable, from, map, switchMap } from 'rxjs';

import { AdminEntity } from 'src/Domain/entities/admin.entity';
import { LearnerEntity } from 'src/Domain/entities/learner.entity';
import { CalificationEntity } from '../../../../Domain/entities/calification.entity';
import { Admin, AdminDocument } from '../schemas/admin.schema';
import { Learner, LearnerDocument } from '../schemas/learner.schema';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminRepository: Model<AdminDocument>,
    @InjectModel(Learner.name)
    private readonly learnerRepository: Model<LearnerDocument>,
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
    return from(this.learnerRepository.findOne({ email }).exec());
  }

  updateAdmin(email: string, admin: AdminEntity): Observable<AdminEntity> {
    return from(
      this.adminRepository.findOneAndUpdate(
        { email },
        { $set: admin },
        { new: true },
      ),
    );
  }

  updateLearner(
    email: string,
    learner: LearnerEntity,
  ): Observable<LearnerEntity> {
    return from(
      this.learnerRepository.findOneAndUpdate(
        { email: email },
        { $set: learner },
        { new: true },
      ),
    );
  }

  gradeStudent(
    learnerId: string,
    calification: CalificationEntity,
  ): Observable<string> {
    return from(this.learnerRepository.findById(learnerId)).pipe(
      switchMap((user) => {
        if (!Array.isArray(user.calification)) {
          user.calification = [];
        }

        const index = user.calification.findIndex(
          (c) => c.courseId === calification.courseId,
        );

        if (index !== -1) {
          user.calification[index].grade = calification.grade;
          user.calification[index].comment = calification.comment;
        } else {
          const newCalification: CalificationEntity = {
            grade: calification.grade,
            comment: calification.comment,
            courseId: calification.courseId,
          };
          user.calification.push(newCalification);
        }

        return from(user.save()).pipe(
          map(
            () =>
              `Calificación actualizada para el usuario con ID: ${learnerId}`,
          ),
        );
      }),
    );
  }
}
