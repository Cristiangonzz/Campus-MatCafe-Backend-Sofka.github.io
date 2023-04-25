import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from 'mongodb';
import { Model } from 'mongoose';
import { Observable, from, map, mergeAll, mergeMap, of, switchMap } from 'rxjs';
import { CalificationEntity } from 'src/Domain/entities';
import {
  AdminDocument,
  Course,
  CourseDocument,
  Learner,
  LearnerDocument,
  Route,
  RouteDocument,
} from '../schemas';
import {
  Calification,
  CalificationDocument,
} from '../schemas/calification.schema';
@Injectable()
export class LearnerRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminRepository: Model<AdminDocument>,
    @InjectModel(Learner.name)
    private readonly learnerRepository: Model<LearnerDocument>,
    @InjectModel(Course.name)
    private readonly CourseModule: Model<CourseDocument>,
    @InjectModel(Route.name)
    private readonly RouteModule: Model<RouteDocument>,
    @InjectModel(Calification.name)
    private readonly calificationRepository: Model<CalificationDocument>,
  ) {}

  sendWorkshop(
    id: string,
    repo: string,
    course: string,
    coment: string,
  ): Observable<string> {
    return from(this.CourseModule.findById(course)).pipe(
      mergeMap((cours) => {
        const adminId = cours.adminId;

        return from(this.adminRepository.findById(adminId)).pipe(
          switchMap((admin) => {
            const notificationExists = admin.notifications.some(
              (notification) =>
                notification.id === id &&
                notification.repo === repo &&
                notification.course === course,
            );

            if (!notificationExists) {
              admin.notifications.push({ id, repo, course, coment });
            }

            return from(admin.save()).pipe(
              switchMap(() => {
                return of('Tarea enviada correctamente');
              }),
            );
          }),
        );
      }),
    );
  }
  subscribeRoute(learnerid: string, courseId: string): Observable<string> {
    return from(this.CourseModule.findById(courseId)).pipe(
      mergeMap(() => {
        return from(this.learnerRepository.findById(learnerid)).pipe(
          map((learner) => {
            const courseExists = learner.route.some(
              (course) => course.toString() === courseId,
            );

            if (!courseExists) {
              learner.route.push(courseId);
            }

            return from(learner.save()).pipe(
              map(() => 'Ruta agregada correctamente'),
            );
          }),
        );
      }),
      mergeAll(),
    );
  }

  saveCalification(
    garde: number,
    comment: string,
    courseId: string,
  ): Observable<CalificationEntity> {
    console.log('saveCalification', garde, comment, courseId);
    return from(
      this.calificationRepository.create({
        garde,
        comment,
        courseId,
      }),
    );
  }
}
