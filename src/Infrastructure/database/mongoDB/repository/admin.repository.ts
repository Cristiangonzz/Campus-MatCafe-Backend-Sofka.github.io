import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Observable, forkJoin, from, map, switchMap } from 'rxjs';

import { NotificationEntity } from 'src/Domain/entities';
import { AdminEntity } from 'src/Domain/entities/admin.entity';
import { LearnerEntity } from 'src/Domain/entities/learner.entity';
import { CalificationEntity } from '../../../../Domain/entities/calification.entity';
import { Admin, AdminDocument } from '../schemas/admin.schema';
import { Learner, LearnerDocument } from '../schemas/learner.schema';
import {
  Notification,
  NotificationDocument,
} from '../schemas/notification.schema';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminRepository: Model<AdminDocument>,
    @InjectModel(Learner.name)
    private readonly learnerRepository: Model<LearnerDocument>,
    @InjectModel(Notification.name)
    private readonly notificationRepository: Model<NotificationDocument>,
  ) {}

  createAdmin(admin: AdminEntity): Observable<AdminEntity> {
    return this.getLernerByEmail(admin.email).pipe(
      switchMap((learner) => {
        if (learner) {
          throw new Error(`Se encontró estudiante con el mail: ${admin.email}`);
        }
        return from(this.adminRepository.create(admin));
      }),
    );
  }

  getAdminByEmail(email: string): Observable<AdminEntity> {
    return from(this.adminRepository.findOne({ email })).pipe(
      map((admin) => {
        if (!admin) {
          throw new Error(
            `No se encontró administrador con correo electrónico: ${email}`,
          );
        }
        return admin;
      }),
    );
  }

  createLerner(learner: LearnerEntity): Observable<LearnerEntity> {
    return this.getAdminByEmail(learner.email).pipe(
      switchMap((learner) => {
        if (learner) {
          throw new Error(`Se encontró admin con el mail: ${learner.email}`);
        }
        return from(this.learnerRepository.create(learner));
      }),
    );
  }

  getLernerByEmail(email: string): Observable<LearnerEntity> {
    return from(this.learnerRepository.findOne({ email })).pipe(
      map((learner) => {
        if (!learner) {
          throw new Error(
            `No se encontró aprendiz con correo electrónico: ${email}`,
          );
        }
        return learner;
      }),
    );
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
              `Calificación actualizada curso ${calification.courseId} y su calificacion fue de ${calification.grade} `,
          ),
        );
      }),
    );
  }

  getAdminAndLearnerEmail(
    email: string,
  ): Observable<AdminEntity | LearnerEntity> {
    const admin$ = from(this.adminRepository.findOne({ email }));
    const learner$ = from(this.learnerRepository.findOne({ email }));

    return forkJoin([admin$, learner$]).pipe(
      map(([admin, learner]) => {
        if (admin) {
          return admin as AdminEntity;
        }
        if (learner) {
          return learner as LearnerEntity;
        }
        throw new Error(
          `No se encontró ni un administrador ni un estudiante con los IDs proporcionados: ${email}, ${email}`,
        );
      }),
    );
  }
  saveNotification(
    learnerId: string,
    notification: NotificationEntity,
  ): Observable<NotificationEntity> {
    return from(
      this.notificationRepository.create({
        id: notification.id,
        repo: notification.repo,
        course: notification.course,
        coment: notification.coment,
      }),
    );
  }
}
