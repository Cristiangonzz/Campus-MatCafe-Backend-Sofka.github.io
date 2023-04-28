import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Observable, catchError, forkJoin, from, map, switchMap } from 'rxjs';

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
import { Course, CourseDocument } from '../schemas';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminRepository: Model<AdminDocument>,
    @InjectModel(Course.name)
    private readonly courseRepository: Model<CourseDocument>,
    @InjectModel(Learner.name)
    private readonly learnerRepository: Model<LearnerDocument>,
    @InjectModel(Notification.name)
    private readonly notificationRepository: Model<NotificationDocument>,
  ) {}

  createAdmin(admin: AdminEntity): Observable<AdminEntity> {
    return from(
      this.learnerRepository.findOne({ email: admin.email }).exec(),
    ).pipe(
      switchMap((existingAdmin) => {
        if (existingAdmin) {
          throw new Error(`Ya existe un aprendiz con el email ${admin.email}`);
        }

        return from(this.adminRepository.create(admin)).pipe(
          map((doc) => doc.toJSON() as AdminEntity),
          catchError((error) => {
            console.error('Error al crear el administrador:', error);
            throw new Error('Error al crear el administrador');
          }),
        );
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
    return from(
      this.adminRepository.findOne({ email: learner.email }).exec(),
    ).pipe(
      switchMap((existingAdmin) => {
        if (existingAdmin) {
          throw new Error(`Ya existe un admin con el email ${learner.email}`);
        }

        return from(this.learnerRepository.create(learner)).pipe(
          map((doc) => doc.toJSON() as LearnerEntity),
          catchError((error) => {
            console.error('Error al crear el Aprendiz:', error);
            throw new Error('Error al crear el Aprendiz');
          }),
        );
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
    return from(this.courseRepository.findById(calification.courseId)).pipe(
      switchMap((course) => {
        const courseName = course.title;
        console.log(courseName);
        if (!course) {
          throw new Error(`Curso ${calification.courseId} no existe`);
        }
        return from(this.learnerRepository.findById(learnerId)).pipe(
          switchMap((user) => {
            const learnerEmail = user.email;
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
              switchMap(() => {
                return from(this.adminRepository.find().exec()).pipe(
                  map((admins) => {
                    admins.forEach((admin) => {
                      const index = admin.notifications.findIndex(
                        (n) => n.id === learnerEmail && n.course === courseName,
                      );
                      if (index !== -1) {
                        admin.notifications.splice(index, 1);
                        admin.save();
                      }
                    });
                    return `Calificación actualizada curso ${calification.courseId} y su calificacion fue de ${calification.grade}`;
                  }),
                );
              }),
            );
          }),
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
