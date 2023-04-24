import { Observable, from, map, mergeAll, mergeMap, of, switchMap } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from 'mongodb';
import { Model } from 'mongoose';
import {
  AdminDocument,
  Course,
  CourseDocument,
  Learner,
  LearnerDocument,
  Route,
  RouteDocument,
} from '../schemas';
import { Injectable } from '@nestjs/common';
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
  ) {}

  sendWorkshop(id: string, repo: string, course: string): Observable<string> {
    // Encontrar el curso correspondiente
    return from(this.CourseModule.findById(course)).pipe(
      mergeMap((cours) => {
        // Obtener el adminId del documento de curso
        const adminId = cours.adminId;

        // Obtener el documento de Admin correspondiente al adminId
        return from(this.adminRepository.findById(adminId)).pipe(
          switchMap((admin) => {
            // Comprobar si ya existe una notificación con los mismos valores
            const notificationExists = admin.notifications.some(
              (notification) =>
                notification.id === id &&
                notification.repo === repo &&
                notification.course === course,
            );

            // Si no existe una notificación con los mismos valores, agregar una nueva notificación
            if (!notificationExists) {
              admin.notifications.push({ id, repo, course });
            }

            // Guardar los cambios realizados en el documento de Admin
            return from(admin.save()).pipe(
              switchMap(() => {
                return of('Workshop notification sent successfully');
              }),
            );
          }),
        );
      }),
    );
  }
  subscribeRoute(learnerid: string, courseId: string): Observable<string> {
    // Encontrar el curso correspondiente
    return from(this.CourseModule.findById(courseId)).pipe(
      mergeMap(() => {
        // Obtener el documento de Learner correspondiente al learnerid
        return from(this.learnerRepository.findById(learnerid)).pipe(
          map((learner) => {
            // Comprobar si el curso ya existe en el array learner.courses
            const courseExists = learner.route.some(
              (course) => course.toString() === courseId,
            );

            // Si el curso no existe en el array learner.courses, agregarlo
            if (!courseExists) {
              learner.route.push(courseId);
            }

            // Guardar los cambios realizados en el documento de Learner y retornar un observable con el mensaje
            return from(learner.save()).pipe(
              map(() => 'Course subscribed successfully'),
            );
          }),
        );
      }),
      mergeAll(),
    );
  }
}
